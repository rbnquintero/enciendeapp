import React, { Component } from 'react'
import {
  Text,
  View,
  WebView,
} from 'react-native'

var Header = require('../common/Header')

class Creencias extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="Creencias Adventistas"
          leftItem={{
            layout: 'icon',
            title: 'Menu',
            icon: {uri:'hamburger'},
            onPress: this.props.openDrawer,
          }}/>
        <WebView
          source={{uri: 'http://www.adventistas.org/es/institucional/creencias/'}}
          style={{flex: 1}}
        />
      </View>
    );
  }
}

module.exports = Creencias
