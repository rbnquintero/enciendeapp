import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Time,
  View
} from 'react-native'
var {TextN} = require('../common/Text');

var FitImage = require('../common/FitImage');
import LinearGradient from 'react-native-linear-gradient';

var moment = require('moment');
var esLocale = require('moment/locale/es');

class VersiculoCard extends Component {

  render() {
    var versiculo = this.props.data
    var fechaStr = moment(new Date(versiculo.created_time)).locale("es", esLocale).format('LL')
    var image = versiculo.attachments.data[0].media.image
    var proporcion = image.height/image.width
    var height = Dimensions.get('window').width * proporcion

    return (
      <FitImage source={{uri: image.src}} style={[styles.newscontainer, {height:height}]}
        ref={component => this._root = component} {...this.props} content={
        <LinearGradient
          locations={[0,0.6]}
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)',]}
          style={{backgroundColor: 'rgba(0,0,0,0)', height: height, paddingHorizontal: 20}}>
          <View style={{flex: 1}}/>
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
  },
  newscontainerTitulo: {
    letterSpacing : 0.5,
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

module.exports = VersiculoCard
