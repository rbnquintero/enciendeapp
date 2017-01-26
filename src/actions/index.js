'use strict'

const appActions = require('./appActions');
const navActions = require('./navActions');
const newsActions = require('./newsActions');
const facebookActions = require('./facebookActions');
const oracionActions = require('./oracionActions');

module.exports = {
  ...appActions,
  ...navActions,
  ...newsActions,
  ...facebookActions,
  ...oracionActions,
};
