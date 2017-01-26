'use strict'

import { Platform } from 'react-native'

var env = require('../utils/environment')
/*
 * action types
 */
const APP_RAW = 'APP_RAW'
const APP_INITIALIZING = 'APP_INITIALIZING'
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
