import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FacebookLogin from './FacebookLogin'
import MenuLogin from './MenuLogin'

/* REDUX */
var { connect } = require('react-redux');
var {
  toNoticias,
  toNosotros,
  toBiblia,
  toCreencias,
  toVersiculos,
  toOracion,
  toCalendario,
  toSamplePage,
} = require('../../actions');

class Menu extends Component {
  goToLogIn() {
    this.props.appnavigator.push({
      title: "Inicio de Sesión",
      name: 'LogIn',
      component: FacebookLogin,
      fromBottom: true,
    });
  }

  render() {
    const { container, welcome } = styles;

    return (
      <View style={container}>
        <MenuLogin iglesia={this.props.app.iglesia} goToLogIn={ this.goToLogIn.bind(this) }/>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {this.props.closeDrawer(); this.props.toNoticias();}}>
          <View style={{backgroundColor:'#fbf9f3', flex:1, margin:3}}>
            <Text style={welcome}>
              Noticias
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {this.props.closeDrawer(); this.props.toNosotros();}}>
          <View style={{backgroundColor:'#fbf9f3', flex:1, margin:3}}>
            <Text style={welcome}>
              ¿Quienes somos?
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {this.props.closeDrawer(); this.props.toCreencias();}}>
          <View style={{backgroundColor:'#fbf9f3', flex:1, margin:3}}>
            <Text style={welcome}>
              Creencias Adventistas
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {this.props.closeDrawer(); this.props.toVersiculos();}}>
          <View style={{backgroundColor:'#fbf9f3', flex:1, margin:3}}>
            <Text style={welcome}>
              Versículo del día
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {this.props.closeDrawer(); this.props.toCalendario();}}>
          <View style={{backgroundColor:'#fbf9f3', flex:1, margin:3}}>
            <Text style={welcome}>
              Calendario
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {this.props.closeDrawer(); this.props.toBiblia();}}>
          <View style={{backgroundColor:'#fbf9f3', flex:1, margin:3}}>
            <Text style={welcome}>
              Santa Biblia
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {this.props.closeDrawer(); this.props.toOracion();}}>
          <View style={{backgroundColor:'#fbf9f3', flex:1, margin:3}}>
            <Text style={welcome}>
              Pedidos de Oración
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#efe9d7',
  },
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    color: 'rgb(75,32,127)',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
};

function select(store) {
  return {
    nav: store.navReducer,
    app: store.appReducer,
  };
}

function actions(dispatch) {
  return {
    toNoticias: () => dispatch(toNoticias()),
    toCreencias: () => dispatch(toCreencias()),
    toNosotros: () => dispatch(toNosotros()),
    toBiblia: () => dispatch(toBiblia()),
    toVersiculos: () => dispatch(toVersiculos()),
    toOracion: () => dispatch(toOracion()),
    toCalendario: () => dispatch(toCalendario()),
    toSamplePage: () => dispatch(toSamplePage()),
  };
}

module.exports = connect(select, actions)(Menu);
