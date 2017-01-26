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

    var Peticion = Parse.Object.extend("Peticion");
    var query = new Parse.Query(Peticion);
    return query.find({
      success: function(results) {
        var pedidos = JSON.parse(JSON.stringify(results))

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

module.exports = {loadItems, fetchItems, itemsLoading, itemsLoaded, itemsLoadingError, itemsRendered};
