'use strict';

//Declaramos el type State
export type State = {
  albums: ?Object;
  error: ?Object;
  fetching: ?Object;
  albumPhotos: ?Object;
  albumPhotosArrays: ?Object;
};

const initialState = {
  albums: [],
  error: null,
  fetching: false,
  albumPhotos: {},
  albumPhotosArrays: {}
};

function albumsReducer(state: State = initialState, action): State {
  if (action.type === 'ALBUMS_FETCHING') {
    return {
      albums: state.albums,
      error: null,
      fetching: true,
      albumPhotos: state.albumPhotos,
      albumPhotosArrays: state.albumPhotosArrays
    }
  } else if (action.type === 'ALBUMS_FETCH') {
    return {
      albums: action.albums,
      error: null,
      fetching: false,
      albumPhotos: state.albumPhotos
    }
  } else if (action.type === 'ALBUMS_FETCH_ERROR') {
    return {
      albums: state.albums,
      error: action.error,
      fetching: false,
      albumPhotos: state.albumPhotos,
      albumPhotosArrays: state.albumPhotosArrays
    }
  } else if (action.type === 'ALBUM_PICS_FETCH') {
    return {
      albums: state.albums,
      error: null,
      fetching: false,
      albumPhotos: action.albumPhotos,
      albumPhotosArrays: action.albumPhotosArrays
    }
  }

  return state;
}

module.exports = albumsReducer;
