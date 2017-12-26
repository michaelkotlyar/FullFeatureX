var express = require('express');
var router = express.Router();
var helper = require('../config/helpers');

router.get('/', helper.loggedIn, function(req, res, next) {
  var renderObject = helper.renderObject(req, {
    title: 'Dashboard',
    bodyClasses: ['dashboard']
  });
  res.render('index', renderObject);
});

router.get('/graphs', helper.loggedIn, function(req, res, next) {
  var renderObject = helper.renderObject(req, {
    title: 'Graphs'
  });
  res.render('dashboard', renderObject);
});

router.post('/profile', helper.loggedIn, function(req, res, next) {
  helper.modifyUser(req, res);
});

module.exports = router;
