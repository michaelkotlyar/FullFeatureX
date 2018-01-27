var express = require('express');
var helper = require('../config/helpers');

module.exports = function(passport, app) {

  var index = require('../routes/index');
  var users = require('../routes/users')(passport);

  app.use('/', index);
  app.use('/users', users);

};
