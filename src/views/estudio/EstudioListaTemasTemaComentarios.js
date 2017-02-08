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
import CommentCard from '../components/common/CommentCard'
var environment = require('../../utils/environment')

/* REDUX */
var { connect } = require('react-redux');
var {
  saveUserComment,
  saveUserCommentLocally,
} = require('../../actions');

class EstudioListaTemasTemaComentarios extends Component {
  state = { comments:this.props.estudio.comments }

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

  tryComment(id) {
    if(this.state.comments[id] != null && this.state.comments[id].length > 0) {
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
  }

  getUserComment() {
    if(!this.props.user.isLoggedIn) {
      return null;
    }
    return (
      <CommentCard
        foto={environment.facebookURL + this.props.user.fbData.id + '/picture?height=200&access_token=' + this.props.user.token}
        comentario={this.state.comments[this.props.pregunta.objectId].comentario}
        fecha={this.state.comments[this.props.pregunta.objectId].fecha}
        nombre={this.props.user.userData.nombre} />);
  }

  render() {
    var width = Dimensions.get('window').height;
    var height = width / 3;
    var pregunta = this.props.pregunta;
    return (
      <View style={{ flex: 1 }}>
        <Header
          title='Pregunta'
          leftItem={{
            layout: 'icon',
            title: 'Close',
            icon: {uri:'back'},
            onPress: this.props.navigator.pop,
          }}/>
        <View style={{marginTop:10, paddingHorizontal:10}}>
          <Text style={styles.newscontainerTexto}>{pregunta.texto}</Text>
          <Text style={styles.newscontainerPregunta}>{pregunta.pregunta}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1, paddingHorizontal:10}}>
          {this.getUserComment()}
          {Array.from(this.props.estudio.commentsPeople.get(pregunta.objectId)).map(function(elem,index){
            if(!this.props.user.isLoggedIn || this.props.user.userData.objectId != elem.get("usuario").id){
              return (
                <CommentCard
                  key={index}
                  foto={environment.facebookURL + elem.get("usuario").get("id_facebook") + '/picture?height=200&access_token=' + this.props.user.token}
                  comentario={elem.get("comentario")}
                  fecha={elem.get("createdAt")}
                  nombre={elem.get("usuario").get("nombre")} />
              );
            }
          }, this)}
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
    saveUserCommentLocally: (id, comment) => dispatch(saveUserCommentLocally(id, comment))
  };
}

module.exports = connect(select, actions)(EstudioListaTemasTemaComentarios);
