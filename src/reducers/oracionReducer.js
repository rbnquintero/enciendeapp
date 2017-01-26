'use strict';

//Declaramos el type State
export type State = {
  isFetching: boolean;
  error: ?string;
  items: ?Object;
  pendingRendering: boolean,
};

const initialState = {
  isFetching: false,
  error: null,
  items: null,
  pendingRendering: false,
};

function oracionReducer(state: State = initialState, action): State {
  if (action.type === 'ORACION_LOADING') {
    return {
      isFetching: true,
      error: null,
      items: state.items,
      pendingRendering: false,
    }
  } else if (action.type === 'ORACION_LOADING_ERROR') {
    return {
      isFetching: false,
      error: action.error,
      items: state.items,
      pendingRendering: false,
    }
  } else if (action.type === 'ORACION_LOADED') {
    var items = action.items;
    if(items == null) {
      items = state.items;
    }
    return {
      isFetching: false,
      error: null,
      items: items,
      pendingRendering: true,
    }
  } else if (action.type === 'ORACION_RENDERED') {
    var items = action.items;
    if(items == null) {
      items = state.items;
    }
    return {
      isFetching: false,
      error: null,
      items: items,
      pendingRendering: false,
    }
  }

  return state;
}

module.exports = oracionReducer;
