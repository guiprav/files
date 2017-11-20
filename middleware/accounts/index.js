let express = require('express');

let dbCollection = require('../dbCollection');
let requireAuth = require('../auth/require');

let adminOnly = require('./adminOnly');
let adminOrOwn = require('./adminOrOwn');
let genMainUploadKey = require('./genMainUploadKey');
let hashPassword = require('./hashPassword');
let removePasswords = require('./removePasswords');

let app = module.exports = express();

app.use(requireAuth);

app.use(dbCollection('accounts', {
  middlewares: {
    beforePost: [
      adminOnly,
      hashPassword,
      genMainUploadKey,
    ],

    beforeGet: [adminOnly],
    beforeGetId: [adminOrOwn],

    beforePatch: [
      adminOnly,
      hashPassword,
    ],

    beforePatchId: [
      adminOrOwn,
      hashPassword,
    ],

    beforeDelete: [adminOnly],
    beforeDeleteId: [adminOnly],
  },

  idField: 'name',
}));

app.use(removePasswords);
