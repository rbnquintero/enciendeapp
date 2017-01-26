import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row'}}>
          <View style={{backgroundColor:'rgb(75,32,127)', flex:1, paddingVertical:20}}>
            <View style={{alignItems:'center', marginVertical:10}}>
              <Image source={{uri:'logo'}} style={{resizeMode:'contain', height:90, width:90}}/>
            </View>
            <Text style={{color:'white', textAlign:'center', fontSize:16}}>
              TEMPLEVILLE SPANISH SDA CHURCH
            </Text>
          </View>
        </View>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {this.props.closeDrawer(); this.props.toNoticias();}}>
          <View style={{backgroundColor:'#fbf9f3', flex:1, margin:3}}>
            <Text style={styles.welcome}>
              Noticias
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {this.props.closeDrawer(); this.props.toNosotros();}}>
          <View style={{backgroundColor:'#fbf9f3', flex:1, margin:3}}>
            <Text style={styles.welcome}>
              ¿Quienes somos?
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {this.props.closeDrawer(); this.props.toCreencias();}}>
          <View style={{backgroundColor:'#fbf9f3', flex:1, margin:3}}>
            <Text style={styles.welcome}>
              Creencias Adventistas
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {this.props.closeDrawer(); this.props.toVersiculos();}}>
          <View style={{backgroundColor:'#fbf9f3', flex:1, margin:3}}>
            <Text style={styles.welcome}>
              Versículo del día
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {this.props.closeDrawer(); this.props.toCalendario();}}>
          <View style={{backgroundColor:'#fbf9f3', flex:1, margin:3}}>
            <Text style={styles.welcome}>
              Calendario
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {this.props.closeDrawer(); this.props.toBiblia();}}>
          <View style={{backgroundColor:'#fbf9f3', flex:1, margin:3}}>
            <Text style={styles.welcome}>
              Santa Biblia
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={() => {this.props.closeDrawer(); this.props.toOracion();}}>
          <View style={{backgroundColor:'#fbf9f3', flex:1, margin:3}}>
            <Text style={styles.welcome}>
              Pedidos de Oración
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});

function select(store) {
  return {
    nav: store.navReducer,
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
