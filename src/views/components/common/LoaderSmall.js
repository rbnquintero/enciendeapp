import React, { Component } from 'react'
import {
  ActivityIndicator,
  Platform
} from 'react-native'

class LoaderSmall extends Component {

  render() {
    return (
      <ActivityIndicator/>
    )
  }
}

module.exports = LoaderSmall
