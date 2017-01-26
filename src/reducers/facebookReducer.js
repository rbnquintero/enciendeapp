'use strict';

//Declaramos el type State
export type State = {
  isFetching: boolean;
  error: ?string;
  versiculos: ?Object;
  pendingRendering: boolean,
};

const initialState = {
  isFetching: false,
  error: null,
  versiculos: null,
  pendingRendering: false,
};

function facebookReducer(state: State = initialState, action): State {
  if (action.type === 'FB_LOADING') {
    return {
      isFetching: true,
      error: null,
      versiculos: state.versiculos,
      pendingRendering: false,
    }
  } else if (action.type === 'FB_LOADING_ERROR') {
    return {
      isFetching: false,
      error: action.error,
      versiculos: state.versiculos,
      pendingRendering: false,
    }
  } else if (action.type === 'FB_LOADED') {
    var versiculos = action.versiculos;
    if(versiculos == null) {
      versiculos = state.versiculos;
    }
    return {
      isFetching: false,
      error: null,
      versiculos: versiculos,
      pendingRendering: true,
    }
  } else if (action.type === 'FB_RENDERED') {
    var versiculos = action.versiculos;
    if(versiculos == null) {
      versiculos = state.versiculos;
    }
    return {
      isFetching: false,
      error: null,
      versiculos: versiculos,
      pendingRendering: false,
    }
  }

  return state;
}

module.exports = facebookReducer;
