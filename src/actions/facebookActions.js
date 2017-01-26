'use strict'

var localRepository = require('../utils/localRepository');
var env = require('../utils/environment');
/*
 * action types
 */
const FB_LOADING = 'FB_LOADING';
const FB_LOADED = 'FB_LOADED';
const FB_LOADING_ERROR = 'FB_LOADING_ERROR';
const FB_RENDERED = 'FB_RENDERED';

/*
 * action creators
 */
function fbLoading() {
  return {
    type: FB_LOADING,
  };
}

function fbRendered() {
  return {
    type: FB_RENDERED,
  };
}

function fbLoadingError(error) {
  return {
    type: FB_LOADING_ERROR,
    error: error,
  };
}

function fbLoaded(versiculos) {
  return {
    type: FB_LOADED,
    versiculos: versiculos,
  };
}

function loadVersiculos() {
  return function(dispatch) {
    dispatch(fbLoading());

    return localRepository.getSavedVersiculos().then((versiculos) => {
      if(versiculos != null) {
        dispatch(fbLoaded(versiculos));
      }
      dispatch(fetchVersiculos());
    });
  }
}

function fetchVersiculos(showLoading) {
  return function(dispatch, getState) {
    const { appReducer } = getState()
    if(showLoading) {
      dispatch(fbLoading());
    }

    var query = env.facebookURL + env.facebookFeed + appReducer.token
    return env.timeout(null, fetch(query)
      .then(response => response.json())
      .then(json => {
        if(json.error != null) {
          console.log(json)
          dispatch(fbLoadingError('servicio no disponible'))
        } else {
          var versiculos = JSON.parse(JSON.stringify(json.data))
          localRepository.saveVersiculos(versiculos);
          dispatch(fbLoaded(versiculos));
        }
      }).catch(error => {
        console.log(error.stack)
        dispatch(fbLoadingError('servicio no disponible'))
      })
    )
  }
}

module.exports = {loadVersiculos, fetchVersiculos, fbLoading, fbLoaded, fbLoadingError, fbRendered};
