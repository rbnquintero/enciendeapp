'use strict';

//Declaramos el type State
export type State = {
  isFetching: boolean;
  error: ?string;
  studies: ?Object;
  pendingRendering: boolean,
};

const initialState = {
  isFetching: false,
  error: null,
  studies: null,
  pendingRendering: false,
};

function estudioReducer(state: State = initialState, action): State {
  if (action.type === 'STUDIES_LOADING') {
    return {
      isFetching: true,
      error: null,
      studies: state.studies,
      pendingRendering: false,
    }
  } else if (action.type === 'STUDIES_LOADING_ERROR') {
    return {
      isFetching: false,
      error: action.error,
      studies: state.studies,
      pendingRendering: false,
    }
  } else if (action.type === 'STUDIES_LOADED') {
    var studies = action.studies;
    if(studies == null) {
      studies = state.studies;
    }
    return {
      isFetching: false,
      error: null,
      studies: studies,
      pendingRendering: true,
    }
  } else if (action.type === 'STUDIES_RENDERED') {
    var studies = action.studies;
    if(studies == null) {
      studies = state.studies;
    }
    return {
      isFetching: false,
      error: null,
      studies: studies,
      pendingRendering: false,
    }
  }

  return state;
}

module.exports = estudioReducer;
