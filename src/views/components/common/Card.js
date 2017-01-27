import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Time,
  View
} from 'react-native'
var {TextN} = require('./Text');

var FitImage = require('./FitImage');
import LinearGradient from 'react-native-linear-gradient';

var moment = require('moment');
var esLocale = require('moment/locale/es');

class Card extends Component {

  render() {
    var evento = this.props.data
    var fechaStr = moment(new Date(evento.fecha.iso)).locale("es", esLocale).format('LL')

    return (
      <FitImage source={{uri: evento.imagen.url}} style={styles.newscontainer}
        ref={component => this._root = component} {...this.props} content={
        <LinearGradient
          locations={[0,0.6]}
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)',]}
          style={{backgroundColor: 'rgba(0,0,0,0)', height: 220, paddingHorizontal: 20, }}>
          <View style={{flex: 1}}/>
          <TextN style={styles.newscontainerTitulo}>{evento.resumen}</TextN>
          <TextN style={styles.newscontainerDate}>{fechaStr}</TextN>
        </LinearGradient>
      }/>
    );
  }
}

const styles = StyleSheet.create({
  newscontainer: {
    borderColor: '#d9d9d9',
    backgroundColor: 'white',
    alignItems: 'stretch',
    height: 220,
  },
  newscontainerTitulo: {
    letterSpacing: 0.5,
    textAlign: 'left',
    fontSize: 22,
    color: 'white',
  },
  newscontainerDate: {
    paddingBottom: 20,
    fontSize: 12,
    color: 'rgb(184,185,189)',
  },
});

module.exports = Card
