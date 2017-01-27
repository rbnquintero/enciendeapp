import React, { Component } from 'react';
import {
  View,
  Navigator,
  Platform,
} from 'react-native';

var MainView = require('./views/MainView')

/* REDUX */
import type {State as AppReducer} from './reducers/appReducer'
var {
  appInitialize,
} = require('./actions')
var { connect } = require('react-redux')
type Props = {
  app: AppReducer;
  appInitialize: () => void;
}

class Enciende extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if(!this.props.app.initialized) {
      this.props.appInitialize()
    }
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

  renderScene(route, navigator) {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <route.component
          appnavigator={navigator}
          {...route.passProps}
        />
      </View>
    );
  }

  render() {
    return (
      <Navigator
        style={{ flex:1 }}
        configureScene={ this.sceneConfig }
        onDidFocus={ this.didFocus }
        initialRoute={{ name:'AppNavigator', title:'AppNavigator', component: MainView, }}
        renderScene={this.renderScene}
        openDrawer={this.props.openDrawer}
      />
    );
  }
}

function select(store) {
  return {
    app: store.appReducer,
  };
}

function actions(dispatch) {
  return {
    appInitialize: () => dispatch(appInitialize()),
  };
}

module.exports = connect(select, actions)(Enciende)
