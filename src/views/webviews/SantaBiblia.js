import React, { Component } from 'react'
import {
  Text,
  View,
  WebView,
} from 'react-native'

var Header = require('../common/Header')

class SantaBiblia extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="SantaBiblia"
          leftItem={{
            layout: 'icon',
            title: 'Menu',
            icon: {uri:'hamburger'},
            onPress: this.props.openDrawer,
          }}/>
        <WebView
          source={{uri: 'http://biblewebapp.com/study/?v1=GN1_1&t1=fcbh%3Arvg&w1=bible'}}
          style={{flex: 1}}
        />
      </View>
    );
  }
}

module.exports = SantaBiblia
