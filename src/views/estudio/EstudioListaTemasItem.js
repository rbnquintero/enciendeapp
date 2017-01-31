import React, { Component } from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
//var {Text} = require('./common/Text');

class EstudioListaTemasItem extends Component {

  render() {
    var container = styles.container;
    var text = styles.text;
    if(this.props.selected) {
      text = styles.textSelected;
      container = styles.containerSelected;
    }

    return (
      <TouchableOpacity onPress={this.props.action} style={{marginVertical:10}}>
        <View style={ container }>
          <Text style={ text }>{this.props.data.nombre}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 10, fontSize: 18, color: 'rgb(240,242,245)'
  },
  textSelected: {
    marginLeft: 10, fontWeight: '500', fontSize: 13, color: 'rgb(29,30,37)',
  },
  container: {
    flexDirection: 'row', paddingHorizontal: 10, height: 45, alignItems: 'center', backgroundColor: 'rgb(29,30,37)', borderRadius:5
  },
  containerSelected: {
    flexDirection: 'row', paddingHorizontal: 10, height: 45, alignItems: 'center', backgroundColor: 'rgb(240,242,245)',
  },
  icon: {
    height: 20, width: 20, resizeMode: Image.resizeMode.contain,
  },
});

module.exports = EstudioListaTemasItem;
