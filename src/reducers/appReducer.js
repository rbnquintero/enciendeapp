'use strict';

//Declaramos el type State
export type State = {
  initialized: boolean;
  token: ?string;
  iglesia: ?Object;
};

const initialState = {
  initialized: false,
  token: null,
  iglesia: null,
};

function app(state: State = initialState, action): State {
  if (action.type === 'APP_RAW') {
    return initialState;
  } else if (action.type === 'APP_SET_IGLESIA') {
    return {
      initialized: true,
      token: state.token,
      iglesia: action.iglesia
    }
  } else if (action.type === 'APP_INITIALIZING') {
    return {
      initialized: false,
      token: state.token,
      iglesia: state.iglesia
    }
  } else if (action.type === 'APP_UPTODATE') {
    return {
      initialized: true,
      token: state.token,
      iglesia: state.iglesia
    }
  } else if (action.type === 'APP_UPTODATE_WITH_TOKEN') {
    return {
      initialized: true,
      token: action.token,
      iglesia: state.iglesia
    }
  }
  return state;
}

module.exports = app;
