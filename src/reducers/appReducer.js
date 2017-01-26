'use strict';

//Declaramos el type State
export type State = {
  initialized: boolean;
  token: ?string;
};

const initialState = {
  initialized: false,
  token: null,
};

function app(state: State = initialState, action): State {
  if (action.type === 'APP_RAW') {
    return initialState;
  } else if (action.type === 'APP_INITIALIZING') {
    return {
      initialized: false,
      token: state.token,
    }
  } else if (action.type === 'APP_UPTODATE') {
    return {
      initialized: true,
      token: state.token,
    }
  } else if (action.type === 'APP_UPTODATE_WITH_TOKEN') {
    return {
      initialized: true,
      token: action.token,
    }
  }
  return state;
}

module.exports = app;
