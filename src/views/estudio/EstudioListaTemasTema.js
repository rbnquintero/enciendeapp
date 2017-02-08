import React, { Component } from 'react'
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Header from '../components/common/Header'
var moment = require('moment')
var esLocale = require('moment/locale/es')
import EstudioListaTemasTemaComentarios from './EstudioListaTemasTemaComentarios'

var FitImage = require('../components/common/FitImage');
import LinearGradient from 'react-native-linear-gradient';

/* REDUX */
var { connect } = require('react-redux');
var {
  saveUserComment,
  saveUserCommentLocally,
  fetchOtherUsersComments,
} = require('../../actions');

class EstudioListaTemasTema extends Component {
  state = { comments:this.props.estudio.comments }

  componentDidMount() {
    var tema = this.props.tema
    this.props.fetchOtherUsersComments(tema.serie.objectId,tema.objectId)
  }

  changeValue(id, value) {
    var comments = this.state.comments
    comments[id]=value
    this.props.saveUserCommentLocally(id, value)
    if(this.props.user.isLoggedIn){
      this.props.saveUserComment(id)
    }
    this.setState({comments: comments})
  }

  postComment(id) {
    this.props.saveUserComment(id)
  }

  comments(pregunta) {
    this.props.navigator.push({
      title: 'Pregunta',
      name: 'EstudioListaTemasTema',
      component: EstudioListaTemasTemaComentarios,
      passProps: {pregunta: pregunta}
    });
  }

  tryComment(id) {
    if(this.props.user.isLoggedIn) {
      this.postComment(id)
    } else {
      Alert.alert(
        'Comentar',
        'Para compartir tu comentario es necesario iniciar sesión con facebook. ¿Deseas iniciar sesión?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
          {text: 'OK', onPress: () => {this.props.navigator.props.goToLogIn(() => this.postComment(id))} },
        ]
      )
    }
  }

  render() {
    var width = Dimensions.get('window').height;
    var height = width / 3;
    var tema = this.props.tema;
    var fecha = new Date(tema.fecha.iso);
    var fechaStr = moment(fecha).locale("es", esLocale).format('LL');
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={tema.nombre}
          leftItem={{
            layout: 'icon',
            title: 'Close',
            icon: {uri:'back'},
            onPress: this.props.navigator.pop,
          }}/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <FitImage source={{uri: tema.serie.imagen.url}} style={styles.newscontainer}
              ref={component => this._root = component} {...this.props} content={
              <LinearGradient
                locations={[0,0.6]}
                colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)',]}
                style={{backgroundColor: 'rgba(0,0,0,0)', paddingHorizontal: 10}}>
                <Text style={styles.newscontainerTitulo}>{tema.nombre}</Text>
                <Text style={styles.newscontainerResumen}>{tema.resumen}</Text>
                <Text style={styles.newscontainerDate}>{fechaStr}</Text>
              </LinearGradient>
            }/>
          </View>
          <View style={{ marginHorizontal: 10, marginTop: 20 }}>
            <Text style={styles.newscontainerTexto}>{tema.contenido}</Text>
            {tema.preguntas.map(function(result, id){
              var commentsSize = 0
              var comments = this.props.estudio.commentsPeople.get(result.objectId)
              if(typeof comments != 'undefined') { commentsSize = comments.size }
              return (
                <View key={id} style={{marginTop:15}}>
                  <Text style={styles.newscontainerTexto}>{result.texto}</Text>
                  <Text style={styles.newscontainerPregunta}>{result.pregunta}</Text>
                  <TextInput value={this.state.comments[result.objectId].comentario} multiline={true} style={styles.respuestaBox} onChangeText={text => this.changeValue(result.objectId, text)}/>
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:1}} onPress={this.comments.bind(this, result)}>
                      <Text style={styles.vercomentarios}>Ver comentarios ({commentsSize})</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} onPress={this.tryComment.bind(this, result.objectId)}>
                      <Text style={styles.comentar}>Comentar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }, this)}
            <View style={{height:35}}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  newscontainerTitulo: {
    marginTop: 20,
    fontWeight: 'bold',
    color: '#eaeaea',
    textAlign: 'left',
    fontSize: 13,
  },
  newscontainerResumen: {
    color: 'white',
    marginTop: 5,
    marginBottom: 10,
    fontWeight: '500',
    textAlign: 'left',
    fontSize: 20,
  },
  newscontainerDate: {
    fontSize: 13,
    fontWeight: '400',
    color: '#a6a6a6',
  },
  bar: {
    borderColor: '#d9d9d9',
    borderTopWidth: 1,
    marginTop: 10,
    marginBottom: 25,
  },
  imagenContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  imagen: {
    resizeMode: Image.resizeMode.contain,
  },
  newscontainerTexto: {
    fontSize: 13,
    fontWeight: '300'
  },
  newscontainerPregunta: {
    fontSize: 13,
    marginBottom: 10,
    marginTop: 5
  },
  respuestaBox: {
    height: 80, flex:1, borderColor:'#cccccc',borderWidth: 1,borderRadius: 4, padding:7
  },
  comentar: {
    fontSize: 13,
    marginTop:3,
    textAlign: 'right',
    flex: 1,
    color: 'rgb(75,32,127)'
  },
  vercomentarios: {
    fontSize: 13,
    marginTop:3,
    textAlign: 'left',
    flex: 1,
    color: 'rgb(75,32,127)'
  }
})

function select(store) {
  return {
    user: store.userReducer,
    estudio: store.estudioReducer,
  };
}

function actions(dispatch) {
  return {
    saveUserComment: (id) => dispatch(saveUserComment(id)),
    saveUserCommentLocally: (id, comment) => dispatch(saveUserCommentLocally(id, comment)),
    fetchOtherUsersComments: (serieId, temaId) => dispatch(fetchOtherUsersComments(serieId, temaId))
  };
}

module.exports = connect(select, actions)(EstudioListaTemasTema);
