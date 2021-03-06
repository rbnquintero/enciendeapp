'use strict'

var { combineReducers } = require('redux');

const reducers = combineReducers({
  appReducer: require('./appReducer'),
  navReducer: require('./navReducer'),
  albumsReducer: require('./albumsReducer'),
  userReducer: require('./userReducer'),
  newsReducer: require('./newsReducer'),
  estudioReducer: require('./estudioReducer'),
  facebookReducer: require('./facebookReducer'),
  oracionReducer: require('./oracionReducer'),
});

export default reducers;
