import React, { Component } from 'react'
import {
  Alert,
  Dimensions,
  Image,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Header from '../components/common/Header'
import LoaderSmall from '../components/common/LoaderSmall'
var moment = require('moment')
var esLocale = require('moment/locale/es')
import EstudioListaTemasTemaComentarios from './EstudioListaTemasTemaComentarios'

var FitImage = require('../components/common/FitImage');
import LinearGradient from 'react-native-linear-gradient';

/* REDUX */
var { connect } = require('react-redux');
var {
  saveUserComment,
  fetchOtherUsersComments,
} = require('../../actions');

class EstudioListaTemasTema extends Component {
  state = { comments:{}, openBoxes:{} }

  componentDidMount() {
    var tema = this.props.tema
    this.props.fetchOtherUsersComments(tema.serie.id,tema.id)
  }

  changeValue(id, value) {
    var comments = this.state.comments
    comments[id]={'comentario':value, 'fecha': new Date()}
    this.setState({comments: comments})
  }

  postComment(id) {
    LayoutAnimation.easeInEaseOut();
    var comments = this.state.comments
    var comment = comments[id].comentario
    comments[id]=null
    var openBoxes = this.state.openBoxes
    openBoxes[id]=null
    this.setState({comments: comments, openBoxes:openBoxes})
    this.props.saveUserComment(id, comment)
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
    if(this.state.openBoxes[id] != null && this.state.openBoxes[id]) {
      //Validate field
      if(this.state.comments[id] != null && this.state.comments[id].comentario.length > 0) {
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
    } else {
      //Open box
      LayoutAnimation.easeInEaseOut();
      var openBoxes = this.state.openBoxes
      openBoxes[id]=true
      this.setState({openBoxes: openBoxes})
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
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="always">
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
              var comments = this.props.estudio.commentsPeople.get(result.id)
              if(typeof comments != 'undefined') { commentsSize = comments.size }
              var comentario = this.state.comments[result.id]!= null ? this.state.comments[result.id].comentario : ''
              var textBox = null;
              if(this.state.openBoxes[result.id] != null && this.state.openBoxes[result.id]) {
                textBox = (
                  <TextInput value={comentario} multiline={true}
                    style={styles.respuestaBox}
                    onChangeText={text => this.changeValue(result.id, text)}/>
                );
              }

              var comentPosting = null;
              if(this.props.estudio.commentPosting == result.id) {
                comentPosting = (
                  <LoaderSmall />
                );
              }

              return (
                <View key={id} style={{marginTop:15}}>
                  <Text style={styles.newscontainerTexto}>{result.texto}</Text>
                  <Text style={styles.newscontainerPregunta}>{result.pregunta}</Text>
                  {textBox}
                  <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:1}} onPress={this.comments.bind(this, result)}>
                      <Text style={styles.vercomentarios}>Ver comentarios ({commentsSize})</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1, flexDirection:'row', justifyContent:'flex-end' }} onPress={this.tryComment.bind(this, result.id)}>
                      {comentPosting}
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
    marginTop: 5
  },
  respuestaBox: {
    height: 80, flex:1, borderColor:'#cccccc',borderWidth: 1,borderRadius: 4, padding:7, marginTop:5
  },
  comentar: {
    fontSize: 13,
    marginTop:3,
    marginLeft:5,
    textAlign: 'right',
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
    saveUserComment: (id, comment) => dispatch(saveUserComment(id, comment)),
    fetchOtherUsersComments: (serieId, temaId) => dispatch(fetchOtherUsersComments(serieId, temaId))
  };
}

module.exports = connect(select, actions)(EstudioListaTemasTema);
