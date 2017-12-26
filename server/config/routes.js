var express = require('express');
var router = express.Router();
var User = require('../models/user');
var helper = require('../config/helpers');

module.exports = (passport, app) => {

  var index = require('../routes/index');
  var login = require('../routes/login')(passport);

  app.use('/', index);
  app.use('/login', login);

}
