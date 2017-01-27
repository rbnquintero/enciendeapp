import React, { Component } from 'react'
import {
  ActivityIndicatorIOS,
  Platform,
  ProgressBarAndroid
} from 'react-native'

class LoaderSmall extends Component {

  render() {

    if(Platform.OS === 'ios') {
      return (
        <ActivityIndicatorIOS/>
      )
    } else {
      return (
        <ProgressBarAndroid/>
      )
    }
  }
}

module.exports = LoaderSmall
