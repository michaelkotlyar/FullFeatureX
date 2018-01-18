var express = require('express');
var router = express.Router();
var helper = require('../config/helpers');

module.exports = (passport, app) => {

  var index = require('../routes/index');
  var users = require('../routes/users')(passport);

  app.use('/', index);
  app.use('/users', users);

};
