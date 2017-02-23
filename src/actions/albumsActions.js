var Parse = require('parse/react-native')
var env = require('../utils/environment');
/*
 * action types
 */
const ALBUMS_FETCHING = 'ALBUMS_FETCHING';
const ALBUMS_FETCH = 'ALBUMS_FETCH';
const ALBUMS_FETCH_ERROR = 'ALBUMS_FETCH_ERROR';
const ALBUM_PICS_FETCHING = 'ALBUM_PICS_FETCHING';
const ALBUM_PICS_FETCH = 'ALBUM_PICS_FETCH';
const ALBUM_PICS_FETCH_ERROR = 'ALBUM_PICS_FETCH_ERROR';

/***********************/
/**     PANTALLAS     **/
/***********************/
function albumsFetching() {
  return {
    type: ALBUMS_FETCHING
  }
}

function albumsFetch(albums) {
  return {
    type: ALBUMS_FETCH,
    albums: albums
  }
}

function albumsFetchError(error) {
  return {
    type: ALBUMS_FETCH_ERROR,
    error: error,
  };
}

function albumPicsFetching() {
  return {
    type: ALBUM_PICS_FETCHING
  }
}

function albumPicsFetch(albumPhotos, albumPhotosArrays) {
  return {
    type: ALBUM_PICS_FETCH,
    albumPhotos: albumPhotos,
    albumPhotosArrays: albumPhotosArrays
  }
}

function albumPicsFetchError(error) {
  return {
    type: ALBUM_PICS_FETCH_ERROR,
    error: error,
  };
}

function fetchAlbums() {
  return function(dispatch, getState) {
    const { userReducer } = getState()
    dispatch(albumsFetching())

    var Albums = Parse.Object.extend("Albums");
    var query = new Parse.Query(Albums);
    return query.find({
      success: function(results) {
        var albums = [];
        var albumPhotos = {};
        var albumPhotosArrays = {};
        results.forEach(function(item,index){
          var album = {
            'id':item.get("albumId"),
            'name':item.get("albumName"),
            'cover':item.get("albumCover")
          }
          albums.push(album);
          albumPhotos[album.id] = [];
          albumPhotosArrays[album.id] = [];
        });
        dispatch(albumsFetch(albums));
        dispatch(albumPicsFetch(albumPhotos, albumPhotosArrays));
      },
      error: function(error) {
        console.log(error.stack)
        dispatch(albumsFetchError('servicio no disponible'));
      }
    }).catch(error => {
      console.log(error.stack);
      dispatch(albumsFetchError('servicio no disponible'));
    });
  }
}

function fetchAlbumPhotos(albumId) {
  return function(dispatch, getState) {
    const { appReducer, albumsReducer } = getState()
    dispatch(albumPicsFetching())

    var query = env.facebookURL + albumId + env.facebookAlbumPhotos + appReducer.token
    return env.timeout(null, fetch(query)
      .then(response => response.json())
      .then(json => {
        if(json.error != null) {
          console.log(json)
          dispatch(albumPicsFetchError('servicio no disponible'))
        } else {
          var albumPhotos = albumsReducer.albumPhotos
          var albumPhotosArrays = albumsReducer.albumPhotosArrays
          var photos = []
          var photosArray = []
          json.data.forEach(function(item,index){
            var photo = {
              'cover': item.images[4].source,
              'name': ''
            }
            photos.push(photo)
            photosArray.push(item.images[4].source)
          });
          albumPhotos[albumId] = photos;
          albumPhotosArrays[albumId] = photosArray;
          dispatch(albumPicsFetch(albumPhotos, albumPhotosArrays));
        }
      }).catch(error => {
        console.log(error.stack)
        dispatch(albumPicsFetchError('servicio no disponible'))
      })
    )
  }
}

module.exports = {fetchAlbums, fetchAlbumPhotos}
