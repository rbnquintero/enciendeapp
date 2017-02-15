import React, { Component } from 'react'
import {
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Header from '../components/common/Header';
import Loader from '../components/common/Loader';
import CommentCard from '../components/common/CommentCard';
var environment = require('../../utils/environment')

import { CheckboxField, Checkbox } from 'react-native-checkbox-field';

var moment = require('moment');
var esLocale = require('moment/locale/es');

/* REDUX */
var { connect } = require('react-redux');
var {
  loadItems,
  itemsRendered,
  enviarPeticion,
} = require('../../actions');

class Oracion extends Component {
  state = { peticion:'', anonima:false }

  componentWillMount() {
    this.props.loadItems();
  }

  comment() {
    this.props.enviarPeticion(this.state.anonima, this.state.peticion);
    this.setState({ peticion:'', anonima:false })
  }

  tryComment() {
    if(this.state.peticion.length > 0) {
      if(!this.props.user.isLoggedIn && !this.state.anonima) {
        Alert.alert(
          'Comentar',
          'Para compartir tu petición es necesario iniciar sesión con facebook. ¿Deseas iniciar sesión?',
          [
            {text: 'Enviar como anónimo', onPress: () => this.comment()},
            {text: 'Iniciar sesión', onPress: () => {this.props.goToLogIn(() => this.comment())} },
          ]
        )
      } else {
        this.comment()
      }
    }
  }

  render() {
    var _this = this
    var list = null
    if(this.props.oracion.items != null) {
      list = (
        <ScrollView
          style={{backgroundColor: 'rgba(0,0,0,0.1)', paddingHorizontal:10}}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled={true}
          keyboardShouldPersistTaps="always"
          refreshControl={
            <RefreshControl
              refreshing={this.props.oracion.isFetching}
              onRefresh={this.props.loadItems}
              tintColor='rgba(255,255,255,0.7)'
            />
          }>
          {this.props.oracion.items.map(function(elem, index){
            var fotoUrl = 'profile'
            var nombre = 'Anónimo'
            if (elem.usuario != null) {
              nombre = elem.usuario.nombre
              fotoUrl = environment.facebookURL + elem.usuario.id_facebook + '/picture?height=200&access_token=' + this.props.user.token
            }
            return (
              <CommentCard
                key={index}
                foto={fotoUrl}
                comentario={elem.peticion}
                fecha={elem.createdAt}
                nombre={nombre} />
            );
          }, this)}
        </ScrollView>
      )
    } else {
      if(!this.props.oracion.isFetching && this.props.oracion.error != null) {
        list = (
          <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
            <TouchableOpacity style={{flex: 1}} onPress={() => {
              this.props.loadItems();
            }} >
              <View style={{flex:1, alignItems: 'center'}}>
                <Text style={{ textAlign: 'center', flex: 1 }}>Ocurrió un error al cargar las oraciones.</Text>
                <Text style={{ textAlign: 'center', flex: 1 }}>Haz click aquí para reintentar.</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      } else {
        list = (
          <Loader />
        )
      }
    }

    const defaultColor = '#fff';
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="Pedidos de oración"
          leftItem={{
            layout: 'icon',
            title: 'Menu',
            icon: {uri:'hamburger'},
            onPress: this.props.openDrawer,
          }}/>
          <View style={{ flex: 1 }}>
            <View style={{padding:10}}>
              <Text style={styles.verse}>Por eso, confiésense unos a otros sus pecados, y oren unos por otros, para que sean sanados. La oración del justo es poderosa y eficaz.</Text>
              <Text style={styles.verse}>(Santiago 5:16)</Text>
              <Text style={styles.desc}>Si deseas que oremos por alguna petición, escríbela abajo</Text>
              <TextInput value={this.state.peticion} multiline={true} style={styles.respuestaBox} onChangeText={peticion => this.setState({ peticion }) }/>
              <View style={{flexDirection:'row', alignItems:'center', marginVertical:10}}>
                <View style={{flex: 1, flexDirection:'row', alignItems:'center'}}>
                  <CheckboxField
                    onSelect={()=> {this.setState({ anonima: !this.state.anonima }) }}
                    defaultColor={defaultColor}
                    selectedColor='rgb(75,32,127)'
                    containerStyle={styles.containerStyle}
                    checkboxStyle={styles.checkboxStyle}
                    selected={this.state.anonima}>
                    <Text style={{ color: defaultColor }}>✓</Text>
                  </CheckboxField>
                  <Text style={[styles.comentar, {color: '#333333', paddingLeft:5}]}>
                    Quiero que sea anónima
                  </Text>
                </View>
                <TouchableOpacity onPress={this.tryComment.bind(this)}>
                  <Text style={styles.comentar}>Oren por mi</Text>
                </TouchableOpacity>
              </View>
            </View>
            {list}
          </View>
      </View>
    );
  }
}

const styles = {
  verse: {
    fontSize: 13,
    textAlign: 'center',
    color: '#333333'
  },
  desc: {
    fontSize: 13,
    paddingVertical: 10,
    textAlign: 'left',
    color: '#333333'
  },
  respuestaBox: {
    height: 80, borderColor:'#cccccc',borderWidth: 1,borderRadius: 4, padding:7
  },
  comentar: {
    fontSize: 13,
    marginTop:3,
    textAlign: 'right',
    color: 'rgb(75,32,127)'
  },
  vercomentarios: {
    fontSize: 13,
    marginTop:3,
    textAlign: 'left',
    flex: 1,
    color: '#333333'
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelStyle: {
    flex: 1
  },
  checkboxStyle: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 5
  }
}

function select(store) {
  return {
    oracion: store.oracionReducer,
    user: store.userReducer,
  };
}

function actions(dispatch) {
  return {
    loadItems: () => dispatch(loadItems()),
    itemsRendered: () => dispatch(itemsRendered()),
    enviarPeticion: (anonima, peticion) => dispatch(enviarPeticion(anonima, peticion))
  };
}

module.exports = connect(select, actions)(Oracion);
