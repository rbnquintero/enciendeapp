'use strict'

var localRepository = require('../utils/localRepository');
var Parse = require('parse/react-native')
/*
 * action types
 */
const STUDIES_LOADING = 'STUDIES_LOADING';
const STUDIES_LOADED = 'STUDIES_LOADED';
const PREGUNTAS_LOADED = 'PREGUNTAS_LOADED';
const STUDIES_FETCHING = 'STUDIES_FETCHING';
const STUDIES_LOADING_ERROR = 'STUDIES_LOADING_ERROR';
const STUDIES_RENDERED = 'STUDIES_RENDERED';
const COMMENT_UPDATE = 'COMMENT_UPDATE';
const COMMENT_POSTING = 'COMMENT_POSTING';
const COMMENTS_PEOPLE_UPDATE = 'COMMENTS_PEOPLE_UPDATE';

/*
 * action creators
 */
function studiesLoading() {
  return {
    type: STUDIES_LOADING,
  };
}

function studiesFetching() {
  return {
    type: STUDIES_FETCHING,
  };
}

function studiesRendered() {
  return {
    type: STUDIES_RENDERED,
  };
}

function studiesLoadingError(error) {
  return {
    type: STUDIES_LOADING_ERROR,
    error: error,
  };
}

function studiesLoaded(studies) {
  return {
    type: STUDIES_LOADED,
    studies: studies,
  };
}

function preguntasLoaded(studies) {
  return {
    type: PREGUNTAS_LOADED,
    studies: studies,
  };
}

function updateComments(comments) {
  return {
    type: COMMENT_UPDATE,
    comments: comments
  }
}

function commentPosting() {
  return {
    type: COMMENT_POSTING
  }
}

function commentsPeopleUpdate(comments) {
  return {
    type: COMMENTS_PEOPLE_UPDATE,
    commentsPeople: comments
  }
}

function loadStudies() {
  return function(dispatch) {
    dispatch(studiesLoading());

    return localRepository.getSavedStudies().then((studies) => {
      if(studies != null) {
        dispatch(studiesLoaded(studies));
        dispatch(fetchComments());
      } else {
        dispatch(fetchStudies());
      }
    });
  }
}

function fetchStudies(showLoading) {
  return function(dispatch) {
    if(showLoading) {
      dispatch(studiesFetching());
    }

    var Temas = Parse.Object.extend("Temas");
    var query = new Parse.Query(Temas);
    query.include("serie");
    query.descending("serie.fecha");
    query.descending("fecha");
    return query.find({
      success: function(results) {
        var studies = JSON.parse(JSON.stringify(results))
        var seriesSet = new Set()
        var temasIds = []
        studies.forEach(function(elem, index){
          var serie
          for (let serieIt of seriesSet) {
            if(serieIt['id'] == elem.serie.objectId) serie = serieIt
          }
          if(serie == null) {
            serie = {
              id:elem.serie.objectId,
              titulo:elem.serie.nombre,
              resumen:elem.serie.descripcion,
              fecha:elem.serie.fecha,
              imagen:elem.serie.imagen,
              introduccion:elem.serie.introduccion
            }
          }

          var temas = serie['temas']
          if(temas == null) temas = []
          elem['preguntas'] = []
          temas.push(elem)
          serie['temas']=temas

          temasIds.push(elem.objectId)

          seriesSet.add(serie)
        });

        localRepository.saveStudies(Array.from(seriesSet));
        dispatch(studiesLoaded(Array.from(seriesSet)));
        dispatch(fetchPreguntas(temasIds));
      },
      error: function(error) {
        console.log(error.stack)
        dispatch(studiesLoadingError('servicio no disponible'));
      }
    }).catch(error => {
      console.log(error.stack);
      dispatch(studiesLoadingError('servicio no disponible'));
    });
  }
}

function fetchPreguntas(temasIds) {
  return function(dispatch, getState) {
    const { estudioReducer } = getState()
    var Preguntas = Parse.Object.extend("Preguntas");
    var query = new Parse.Query(Preguntas);
    //query.containedIn("tema.objectId", temasIds);
    query.ascending("tema");
    query.ascending("order");
    return query.find({
      success: function(results) {
        var preguntas = JSON.parse(JSON.stringify(results))
        var series = estudioReducer.studies
        series.forEach(function(serie,indexS){
          serie.temas.forEach(function(tema,indexT){
            preguntas.forEach(function(pregunta,indexP){
              if(pregunta.tema.objectId == tema.objectId) {
                tema.preguntas.push(pregunta)
              }
            });
          });
        });

        localRepository.saveStudies(series);
        dispatch(preguntasLoaded(series));
      },
      error: function(error) {
        console.log(error.stack)
      }
    }).catch(error => {
      console.log(error.stack);
    });
  }
}

function fetchComments() {
  return function(dispatch, getState) {
    const { userReducer } = getState();
    return localRepository.getSavedComments().then((comments) => {
      if(comments == null) {
        comments = {}
      }
      dispatch(updateComments(comments));
      if (userReducer.isLoggedIn) {
        dispatch(fetchCommentsFromCloud());
      }
    });
  }
}

function fetchCommentsFromCloud() {
  return function(dispatch, getState) {
    const { userReducer } = getState()
    // aditional parse structuring
    var Usuario = Parse.Object.extend("Usuario");
    var usuario = Usuario.createWithoutData(userReducer.userData.objectId);

    var Comentarios = Parse.Object.extend("Comentarios");
    var query = new Parse.Query(Comentarios);
    query.equalTo("usuario", usuario);
    return query.find({
      success: function(results) {
        var comments = {}
        results.forEach(function(elem, index){
          comments[elem.get("pregunta").id]={'comentario':elem.get("comentario"),'fecha':elem.get("createdAt")}
        });
        localRepository.saveComments(comments)
        dispatch(updateComments(comments));
      },
      error: function(error) {
        console.log(error.stack)
      }
    }).catch(error => {
      console.log(error.stack);
    });
  }
}

function saveUserComment(id) {
  return function(dispatch, getState) {
    dispatch(commentPosting());
    const { estudioReducer, userReducer } = getState()
    var comment = estudioReducer.comments[id]
    if(typeof comment !='undefined') {
      // aditional parse structuring
      var Usuario = Parse.Object.extend("Usuario");
      var Preguntas = Parse.Object.extend("Preguntas");
      var pregunta = Preguntas.createWithoutData(id);
      var usuario = Usuario.createWithoutData(userReducer.userData.objectId);

      var Comentarios = Parse.Object.extend("Comentarios");
      var query = new Parse.Query(Comentarios);
      query.equalTo("pregunta", pregunta);
      query.equalTo("usuario", usuario);
      return query.find({
        success: function(results) {
          var comentario = null

          if(results.length > 0) {
            comentario = results[0]
            comentario.set("comentario", comment)
          } else {
            comentario = new Comentarios();
            comentario.set("pregunta", pregunta)
            comentario.set("usuario", usuario)
            comentario.set("comentario", comment)
          }
          comentario.save();

        },
        error: function(error) {
          console.log(error.stack)
        }
      }).catch(error => {
        console.log(error.stack);
      });
    }
  }
}

function saveUserCommentLocally(id, comment) {
  return function(dispatch) {
    return localRepository.getSavedComments().then((comments) => {
      if(comments == null) {
        comments = {}
      }
      comments[id]=comment
      localRepository.saveComments(comments)
    });
  }
}

function fetchOtherUsersComments(idSerie, idTema) {
  return function(dispatch, getState) {
    var Comentarios = Parse.Object.extend("Comentarios");
    var Preguntas = Parse.Object.extend("Preguntas");
    var query = new Parse.Query(Comentarios);
    const { estudioReducer } = getState()
    var preguntasArray = []

    //Armamos el array de preguntas
    estudioReducer.studies.forEach(function(serie,inS){
      if(serie.id == idSerie) {
        serie.temas.forEach(function(tema,inT){
          if(tema.objectId == idTema) {
            tema.preguntas.forEach(function(pregunta, inP){
              var preguntaPointer = Preguntas.createWithoutData(pregunta.objectId);
              preguntasArray.push(preguntaPointer)
            });
          }
        });
      }
    });

    query.include("usuario");
    query.containedIn("pregunta", preguntasArray);
    return query.find({
      success: function(results) {
        var comments = new Map()

        results.forEach(function(comment, index){
          var pregCommentsSet = comments.get(comment.get("pregunta").id)
          if(pregCommentsSet == null) pregCommentsSet = new Set()
          pregCommentsSet.add(comment)
          comments.set(comment.get("pregunta").id, pregCommentsSet)
        });

        dispatch(commentsPeopleUpdate(comments))
      },
      error: function(error) {
        console.log(error.stack)
      }
    }).catch(error => {
      console.log(error.stack);
    });
  }
}

module.exports = {loadStudies, fetchStudies, studiesLoading, studiesLoaded, studiesLoadingError, studiesRendered, saveUserComment, saveUserCommentLocally, fetchOtherUsersComments};
