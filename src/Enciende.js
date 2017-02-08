import React, { Component } from 'react';
import {
  View,
  Navigator,
  Platform,
} from 'react-native';

var MainView = require('./views/MainView')

/* REDUX */
var { connect } = require('react-redux')
var {
  appInitialize,
  fetchProfile,
  logOut,
} = require('./actions')

class Enciende extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if(!this.props.app.initialized) {
      this.props.appInitialize()
    }

    //this.props.logOut();
    if (!this.props.user.isLoggedIn || !this.props.user.isRegistered || !this.props.user.currentRally== null) {
      this.props.fetchProfile();
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
          callback={route.callback}
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
    user: store.userReducer,
  };
}

function actions(dispatch) {
  return {
    appInitialize: () => dispatch(appInitialize()),
    fetchProfile: () => dispatch(fetchProfile()),
    logOut: () => dispatch(logOut()),
  };
}

module.exports = connect(select, actions)(Enciende)
