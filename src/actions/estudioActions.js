'use strict'

var localRepository = require('../utils/localRepository');
var Parse = require('parse/react-native')
/*
 * action types
 */
const STUDIES_LOADING = 'STUDIES_LOADING';
const STUDIES_LOADED = 'STUDIES_LOADED';
const STUDIES_FETCHING = 'STUDIES_FETCHING';
const STUDIES_LOADING_ERROR = 'STUDIES_LOADING_ERROR';
const STUDIES_RENDERED = 'STUDIES_RENDERED';

/*
 * action creators
 */
function studiesLoading() {
  return {
    type: STUDIES_LOADING,
  };
}

function studiesFetching() {
  return {
    type: STUDIES_FETCHING,
  };
}

function studiesRendered() {
  return {
    type: STUDIES_RENDERED,
  };
}

function studiesLoadingError(error) {
  return {
    type: STUDIES_LOADING_ERROR,
    error: error,
  };
}

function studiesLoaded(studies) {
  return {
    type: STUDIES_LOADED,
    studies: studies,
  };
}

function loadStudies() {
  return function(dispatch) {
    dispatch(studiesLoading());

    return localRepository.getSavedStudies().then((studies) => {
      if(studies != null) {
        dispatch(studiesLoaded(studies));
      } else {
        dispatch(fetchStudies());
      }
    });
  }
}

function fetchStudies(showLoading) {
  return function(dispatch) {
    if(showLoading) {
      dispatch(studiesFetching());
    }

    var Temas = Parse.Object.extend("Temas");
    var query = new Parse.Query(Temas);
    query.include("serie");
    query.descending("serie.fecha");
    query.descending("fecha");
    return query.find({
      success: function(results) {
        var studies = JSON.parse(JSON.stringify(results))
        var seriesSet = new Set()
        studies.forEach(function(elem, index){
          var serie
          for (let serieIt of seriesSet) {
            if(serieIt['id'] == elem.serie.objectId) serie = serieIt
          }
          if(serie == null) {
            serie = {
              id:elem.serie.objectId,
              titulo:elem.serie.nombre,
              resumen:elem.serie.descripcion,
              fecha:elem.serie.fecha,
              imagen:elem.serie.imagen,
              introduccion:elem.serie.introduccion
            }
          }

          var temas = serie['temas']
          if(temas == null) temas = []
          temas.push(elem)
          serie['temas']=temas

          seriesSet.add(serie)
        });

        localRepository.saveStudies(Array.from(seriesSet));
        dispatch(studiesLoaded(studies));
      },
      error: function(error) {
        console.log(error.stack)
        dispatch(studiesLoadingError('servicio no disponible'));
      }
    }).catch(error => {
      console.log(error.stack);
      dispatch(studiesLoadingError('servicio no disponible'));
    });
  }
}

module.exports = {loadStudies, fetchStudies, studiesLoading, studiesLoaded, studiesLoadingError, studiesRendered};
