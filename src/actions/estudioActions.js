'use strict'

var localRepository = require('../utils/localRepository');
var Parse = require('parse/react-native')
/*
 * action types
 */
const STUDIES_LOADING = 'STUDIES_LOADING';
const STUDIES_LOADED = 'STUDIES_LOADED';
const PREGUNTAS_LOADED = 'PREGUNTAS_LOADED';
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

function preguntasLoaded(studies) {
  return {
    type: PREGUNTAS_LOADED,
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
        var temasIds = []
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
          elem['preguntas'] = []
          temas.push(elem)
          serie['temas']=temas

          temasIds.push(elem.objectId)

          seriesSet.add(serie)
        });

        localRepository.saveStudies(Array.from(seriesSet));
        dispatch(studiesLoaded(Array.from(seriesSet)));
        dispatch(fetchPreguntas(temasIds));
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

function fetchPreguntas(temasIds) {
  return function(dispatch, getState) {
    const { estudioReducer } = getState()
    var Preguntas = Parse.Object.extend("Preguntas");
    var query = new Parse.Query(Preguntas);
    //query.containedIn("tema.objectId", temasIds);
    query.ascending("tema");
    query.ascending("order");
    return query.find({
      success: function(results) {
        var preguntas = JSON.parse(JSON.stringify(results))
        var series = estudioReducer.studies
        series.forEach(function(serie,indexS){
          serie.temas.forEach(function(tema,indexT){
            preguntas.forEach(function(pregunta,indexP){
              if(pregunta.tema.objectId == tema.objectId) {
                tema.preguntas.push(pregunta)
              }
            });
          });
        });

        localRepository.saveStudies(series);
        dispatch(preguntasLoaded(series));
      },
      error: function(error) {
        console.log(error.stack)
      }
    }).catch(error => {
      console.log(error.stack);
    });
  }
}

module.exports = {loadStudies, fetchStudies, studiesLoading, studiesLoaded, studiesLoadingError, studiesRendered};
