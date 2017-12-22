var express = require('express');
var router = express.Router();
var User = require('../models/user');
var helper = require('../config/helpers');

module.exports = (passport) => {

  router.get('/', function(req, res, next) {
    var renderObject = { title: 'Login' };
    var warningMsg = req.flash('error');
    if (warningMsg.length !== 0) { renderObject.warning = warningMsg; }
    res.render('login', renderObject);
  });

  router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

  return router;
};
