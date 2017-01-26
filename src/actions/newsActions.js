'use strict'

var localRepository = require('../utils/localRepository');
var Parse = require('parse/react-native')
/*
 * action types
 */
const NEWS_LOADING = 'NEWS_LOADING';
const NEWS_LOADED = 'NEWS_LOADED';
const NEWS_LOADING_ERROR = 'NEWS_LOADING_ERROR';
const NEWS_RENDERED = 'NEWS_RENDERED';

/*
 * action creators
 */
function newsLoading() {
  return {
    type: NEWS_LOADING,
  };
}

function newsRendered() {
  return {
    type: NEWS_RENDERED,
  };
}

function newsLoadingError(error) {
  return {
    type: NEWS_LOADING_ERROR,
    error: error,
  };
}

function newsLoaded(news) {
  return {
    type: NEWS_LOADED,
    news: news,
  };
}

function loadNews() {
  return function(dispatch) {
    dispatch(newsLoading());

    return localRepository.getSavedNews().then((news) => {
      if(news != null) {
        dispatch(newsLoaded(news));
      }
      dispatch(fetchNews());
    });
  }
}

function fetchNews(showLoading) {
  return function(dispatch) {
    if(showLoading) {
      dispatch(newsLoading());
    }

    var Noticia = Parse.Object.extend("Noticia");
    var query = new Parse.Query(Noticia);
    return query.find({
      success: function(results) {
        var noticias = JSON.parse(JSON.stringify(results))

        localRepository.saveNews(noticias);
        dispatch(newsLoaded(noticias));
      },
      error: function(error) {
        console.log(error.stack)
        dispatch(newsLoadingError('servicio no disponible'));
      }
    }).catch(error => {
      console.log(error.stack);
      dispatch(newsLoadingError('servicio no disponible'));
    });
  }
}

module.exports = {loadNews, fetchNews, newsLoading, newsLoaded, newsLoadingError, newsRendered};
