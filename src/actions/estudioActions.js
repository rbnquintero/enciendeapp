'use strict'

var localRepository = require('../utils/localRepository');
var Parse = require('parse/react-native')
/*
 * action types
 */
const STUDIES_LOADING = 'STUDIES_LOADING';
const STUDIES_LOADED = 'STUDIES_LOADED';
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
      }
      dispatch(fetchStudies());
    });
  }
}

function fetchStudies(showLoading) {
  return function(dispatch) {
    if(showLoading) {
      dispatch(studiesLoading());
    }

    var Serie = Parse.Object.extend("Serie");
    var query = new Parse.Query(Serie);
    return query.find({
      success: function(results) {
        var studies = JSON.parse(JSON.stringify(results))

        localRepository.saveStudies(studies);
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
