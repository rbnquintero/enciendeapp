'use strict'

var { combineReducers } = require('redux');

const reducers = combineReducers({
  appReducer: require('./appReducer'),
  navReducer: require('./navReducer'),
  userReducer: require('./userReducer'),
  newsReducer: require('./newsReducer'),
  facebookReducer: require('./facebookReducer'),
  oracionReducer: require('./oracionReducer'),
});

export default reducers;
