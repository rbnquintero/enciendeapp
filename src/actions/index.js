'use strict'

const appActions = require('./appActions');
const navActions = require('./navActions');
const userActions = require('./userActions');
const newsActions = require('./newsActions');
const estudioActions = require('./estudioActions');
const facebookActions = require('./facebookActions');
const oracionActions = require('./oracionActions');

module.exports = {
  ...appActions,
  ...navActions,
  ...userActions,
  ...newsActions,
  ...estudioActions,
  ...facebookActions,
  ...oracionActions,
};
