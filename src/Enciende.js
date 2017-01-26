import React, { Component } from 'react';
import {
  View
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

  render() {
    return (
      <MainView style={{flex:1}}/>
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
