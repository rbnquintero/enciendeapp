'use strict'

import { Platform } from 'react-native'

var env = require('../utils/environment')
var localRepository = require('../utils/localRepository');
var Parse = require('parse/react-native')
/*
 * action types
 */
const APP_RAW = 'APP_RAW'
const APP_INITIALIZING = 'APP_INITIALIZING'
const APP_SET_IGLESIA = 'APP_SET_IGLESIA'
const APP_LOADING_IGLESIA = 'APP_LOADING_IGLESIA'
const APP_FB_INITIALIZING = 'APP_FB_INITIALIZING'
const APP_UPTODATE = 'APP_UPTODATE'
const APP_UPTODATE_WITH_TOKEN = 'APP_UPTODATE_WITH_TOKEN'

/*
 * action creators
 */
function appSimpleState(state) {
  return {
    type: state,
  }
}

function appSetIglesia(iglesia) {
  return {
    type: APP_SET_IGLESIA,
    iglesia: iglesia
  }
}

function appWithFbToken(token) {
  return {
    type: APP_UPTODATE_WITH_TOKEN,
    token: token
  }
}

/***********************/
/**      COMMON       **/
/***********************/
function appInitialize() {
  return function(dispatch) {
    dispatch(appSimpleState(APP_INITIALIZING))

    return localRepository.getSavedIglesia().then((iglesia) => {
      if(iglesia != null) {
        dispatch(appSetIglesia(iglesia));
      }
      dispatch(loadIglesia());
    });
  }
}

function loadIglesia() {
  return function(dispatch) {
    dispatch(appSimpleState(APP_LOADING_IGLESIA))

    var Iglesia = Parse.Object.extend("Iglesia");
    var query = new Parse.Query(Iglesia);
    query.equalTo("objectId", "ZgVVYVo1fK");
    return query.find({
      success: function(results) {
        var iglesias = JSON.parse(JSON.stringify(results))
        dispatch(appSetIglesia(iglesias[0]));
        localRepository.saveIglesia(iglesias[0]);
        dispatch(appFbInitialize());
      },
      error: function(error) {
        console.log(error.stack)
        //dispatch(newsLoadingError('servicio no disponible'));
      }
    }).catch(error => {
      console.log(error.stack);
      //dispatch(newsLoadingError('servicio no disponible'));
    });
  }
}

function appFbInitialize() {
  return function(dispatch) {
    dispatch(appSimpleState(APP_FB_INITIALIZING))

    var query = env.facebookURL + env.facebookAuth
    return env.timeout(null, fetch(query)
      .then(response => response.json())
      .then(json => {
        if(json.error != null) {
          dispatch(appSimpleState(APP_UPTODATE))
        } else {
          dispatch(appWithFbToken(json.access_token))
        }
      }).catch(error => {
        console.log(error.stack)
        dispatch(appSimpleState(APP_UPTODATE))
      })
    )
  }
}

module.exports = {appInitialize}
