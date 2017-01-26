import React, { Component } from 'react'
import {
  Navigator,
  Platform,
  View,
} from 'react-native'

import BackPress from '../common/BackPress';
var NoticiasLista = require('./NoticiasLista')

class NoticiasMain extends Component {

  componentDidMount() {
      this.backPress = new BackPress(this.navigation,this.props.drawer)
  }

  componentWillUnmount() {
    this.backPress.removeListener()
  }

  sceneConfig(route, routeStack) {
    if(route.fromBottom!=null){
      if(Platform.OS === 'ios') {
        return Navigator.SceneConfigs.FloatFromBottom;
      } else {
        return Navigator.SceneConfigs.FloatFromBottomAndroid;
      }
    } else {
      return Navigator.SceneConfigs.PushFromRight;
    }
  }

  routeMapper(route, navigator) {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <route.component
          navigator={navigator}
          {...route.passProps}/>
      </View>
    )
  }

  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        ref={view => this.navigation = view}
        configureScene={ this.sceneConfig }
        initialRoute={{ name:'Inicio', title:'Inicio', component: NoticiasLista }}
        renderScene={ this.routeMapper }
        openDrawer={this.props.openDrawer}/>
    )
  }
}

module.exports = NoticiasMain
