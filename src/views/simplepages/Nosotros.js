import React, { Component } from 'react'
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native'
import Header from '../components/common/Header'
import SegmentoMapa from '../components/common/SegmentoMapa'

/* REDUX */
var { connect } = require('react-redux');

class Nosotros extends Component {

  handleClick(url) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log('Don\'t know how to open URI: ' + url);
      }
    });
  };

  openDirections(lat, lon) {
    var platform = 'google';
    if(Platform.OS === 'ios') {
      platform = 'apple';
    }
    var directions = 'http://maps.' + platform + '.com/?daddr=' + lat + ',' + lon + '&dirflg=d&t=m'
    Linking.canOpenURL(directions).then(supported => {
      if (supported) {
        Linking.openURL(directions);
      } else {
        console.log('Don\'t know how to open URI: ' + directions);
      }
    });
  }

  render() {
    var iglesia = this.props.app.iglesia
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="¿Quienes somos?"
          leftItem={{
            layout: 'icon',
            title: 'Menu',
            icon: {uri:'hamburger'},
            onPress: this.props.openDrawer,
          }}/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.welcome}>{iglesia.nombre}</Text>
          <Text style={styles.text}>{iglesia.descripcion}</Text>
          <Text style={[styles.text, {color: 'rgb(75,32,127)'}]}>Servicios:</Text>
          {iglesia.servicios.split(',').map(function(elem,index){
            return (
              <Text key={index} style={[styles.text, {marginVertical:0}]}>{elem}</Text>
            );
          }, this)}
          <Text style={[styles.text,{color: 'rgb(75,32,127)',marginTop:20}]}>Address:</Text>
          <Text style={[styles.text, {marginVertical:0}]}>{iglesia.direccion}</Text>
          <TouchableOpacity onPress={() => this.handleClick(iglesia.url)}><Text style={[styles.text, {marginTop:20}]}>{iglesia.url}</Text></TouchableOpacity>
          <View style={{height:300, flex:1, marginTop:30}}>
            <SegmentoMapa latitud={iglesia.lat} longitud={iglesia.lon} titulo={iglesia.nombre}/>
            <TouchableOpacity style={{position:'absolute', right:0}} onPress={() => this.openDirections(iglesia.lat,iglesia.lon)}>
              <View style={{backgroundColor:'rgba(255,255,255,0.85)', margin:5, borderRadius:4}}>
                <Image source={{uri:'route', width:30, height:30, marginTop:30, marginRight:30}}/>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 18,
    textAlign: 'center',
    color: 'rgb(75,32,127)',
    margin: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'left',
    color: '#575a5c',
    margin: 10,
  },
});

function select(store) {
  return {
    app: store.appReducer,
  };
}

module.exports = connect(select)(Nosotros);
