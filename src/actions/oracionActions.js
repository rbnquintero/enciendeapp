'use strict'

var localRepository = require('../utils/localRepository');
var Parse = require('parse/react-native')
/*
 * action types
 */
const ITEMS_LOADING = 'ORACION_LOADING';
const ITEMS_LOADED = 'ORACION_LOADED';
const ITEMS_LOADING_ERROR = 'ORACION_LOADING_ERROR';
const ITEMS_RENDERED = 'ORACION_RENDERED';

/*
 * action creators
 */
function itemsLoading() {
  return {
    type: ITEMS_LOADING,
  };
}

function itemsRendered() {
  return {
    type: ITEMS_RENDERED,
  };
}

function itemsLoadingError(error) {
  return {
    type: ITEMS_LOADING_ERROR,
    error: error,
  };
}

function itemsLoaded(items) {
  return {
    type: ITEMS_LOADED,
    items: items,
  };
}

function loadItems() {
  return function(dispatch) {
    dispatch(itemsLoading());

    return localRepository.getSavedOracion().then((items) => {
      if(items != null) {
        dispatch(itemsLoaded(items));
      }
      dispatch(fetchItems());
    });
  }
}

function fetchItems(showLoading) {
  return function(dispatch) {
    if(showLoading) {
      dispatch(itemsLoading());
    }

    var Oracion = Parse.Object.extend("Oracion");
    var query = new Parse.Query(Oracion);
    query.include("usuario")
    query.descending("createdAt")
    return query.find({
      success: function(results) {
        var pedidos = []
        results.forEach(function(elem, index){
          var pedido = {
            'id': elem.id,
            'createdAt': elem.get("createdAt"),
            'peticion': elem.get("peticion"),
            'usuario': elem.get("usuario") != null ? {
              'id_facebook': elem.get("usuario").get("id_facebook"),
              'nombre': elem.get("usuario").get("nombre")
            } : null
          }
          pedidos.push(pedido)
        });
        localRepository.saveOracion(pedidos);
        dispatch(itemsLoaded(pedidos));
      },
      error: function(error) {
        console.log(error.stack)
        dispatch(itemsLoadingError('servicio no disponible'));
      }
    }).catch(error => {
      console.log(error.stack);
      dispatch(itemsLoadingError('servicio no disponible'));
    });
  }
}

function enviarPeticion(anonima, peticion) {
  return function(dispatch, getState) {
    const { userReducer } = getState();
    var Oracion = Parse.Object.extend("Oracion");
    var peticionObj = new Oracion();
    if(!anonima && userReducer.isLoggedIn) {
      var Usuario = Parse.Object.extend("Usuario");
      var usuarioObj = Usuario.createWithoutData(userReducer.userData.objectId);
      peticionObj.set("usuario", usuarioObj)
    }
    peticionObj.set("peticion", peticion)
    peticionObj.save(null, {
      success: function(peticion) {
        dispatch(fetchItems(false))
      },
      error: function(peticion, error) {
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  }
}

module.exports = {loadItems, fetchItems, itemsLoading, itemsLoaded, itemsLoadingError, itemsRendered, enviarPeticion};
