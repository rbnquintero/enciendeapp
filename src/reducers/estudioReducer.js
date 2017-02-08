'use strict';

//Declaramos el type State
export type State = {
  isFetching: boolean;
  error: ?string;
  studies: ?Object;
  comments: ?Object;
  commentPosting: boolean;
  commentsPeople: ?Object;
  pendingRendering: boolean;
};

const initialState = {
  isFetching: false,
  error: null,
  studies: null,
  comments: {},
  commentPosting: false,
  commentsPeople: new Map(),
  pendingRendering: false,
};

function estudioReducer(state: State = initialState, action): State {
  if (action.type === 'STUDIES_LOADING') {
    return {
      isFetching: true,
      error: null,
      studies: state.studies,
      comments: state.comments,
      commentPosting: state.commentPosting,
      commentsPeople: state.commentsPeople,
      pendingRendering: false,
    }
  } else if (action.type === 'STUDIES_FETCHING') {
      return {
        isFetching: true,
        error: null,
        studies: state.studies,
        comments: state.comments,
        commentPosting: state.commentPosting,
        commentsPeople: state.commentsPeople,
        pendingRendering: false,
      }
  } else if (action.type === 'STUDIES_LOADING_ERROR') {
    return {
      isFetching: false,
      error: action.error,
      studies: state.studies,
      comments: state.comments,
      commentPosting: state.commentPosting,
      commentsPeople: state.commentsPeople,
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
      comments: state.comments,
      commentPosting: state.commentPosting,
      commentsPeople: state.commentsPeople,
      pendingRendering: true,
    }
  } else if (action.type === 'PREGUNTAS_LOADED') {
    var studies = action.studies;
    if(studies == null) {
      studies = state.studies;
    }
    return {
      isFetching: state.isFetching,
      error: state.error,
      studies: studies,
      comments: state.comments,
      commentPosting: state.commentPosting,
      commentsPeople: state.commentsPeople,
      pendingRendering: state.pendingRendering,
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
      comments: state.comments,
      commentPosting: state.commentPosting,
      commentsPeople: state.commentsPeople,
      pendingRendering: false,
    }
  } else if (action.type === 'COMMENT_UPDATE') {
    return {
      isFetching: state.isFetching,
      error: state.error,
      studies: state.studies,
      comments: action.comments,
      commentPosting: false,
      commentsPeople: state.commentsPeople,
      pendingRendering: state.pendingRendering,
    }
  } else if (action.type === 'COMMENT_POSTING') {
    return {
      isFetching: state.isFetching,
      error: state.error,
      studies: state.studies,
      comments: state.comments,
      commentPosting: true,
      commentsPeople: state.commentsPeople,
      pendingRendering: state.pendingRendering,
    }
  } else if (action.type === 'COMMENTS_PEOPLE_UPDATE') {
    return {
      isFetching: state.isFetching,
      error: state.error,
      studies: state.studies,
      comments: state.comments,
      commentPosting: state.commentPosting,
      commentsPeople: action.commentsPeople,
      pendingRendering: state.pendingRendering,
    }
  }

  return state;
}

module.exports = estudioReducer;
