import React, { Component } from 'react'
import {
  Text,
  View,
} from 'react-native'

var Header = require('../common/Header')
class Sample extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="Sample"
          leftItem={{
            layout: 'icon',
            title: 'Menu',
            icon: {uri:'hamburger'},
            onPress: this.props.openDrawer,
          }}/>
          <Text>Sample page</Text>
      </View>
    );
  }
}
module.exports = Sample
