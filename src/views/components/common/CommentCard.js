import React, { Component } from 'react';
import {
  Image,
  View,
  Text
} from 'react-native';

var moment = require('moment')
var esLocale = require('moment/locale/es')

class CommentCard extends Component {
  render() {
    var fecha = new Date(this.props.fecha);
    var fechaStr = moment(fecha).locale("es", esLocale).fromNow();
    return (
      <View style={{flexDirection:'row', marginVertical:5}}>
        <Image style={styles.photo} source={{uri:this.props.foto}}/>
        <View style={{marginLeft:5, flex: 1}}>
          <View style={{flexDirection:'row'}}>
            <Text style={[styles.vercomentarios, {fontSize:9, color: 'rgb(75,32,127)'}]}>{this.props.nombre}</Text>
            <Text style={[styles.comentar, {fontSize:9}]}>{fechaStr}</Text>
          </View>
          <Text style={styles.vercomentarios}>{this.props.comentario}</Text>
        </View>
      </View>
    );
  }
}

const styles = {
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
    color: '#333333'
  },
  photo: {
    width:35,
    height:35,
    resizeMode: Image.resizeMode.contain
  }
}

module.exports = CommentCard;
