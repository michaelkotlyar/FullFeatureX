var express = require('express');
var router = express.Router();
var helper = require('../config/helpers');

router.get('/', helper.loggedIn, function(req, res, next) {
  var renderObject = { title: 'Dashboard', bodyClasses: ['dashboard'] };
  if (req.user) {
    renderObject.username = req.user.user_name;
  }
  res.render('index', renderObject);
});

router.get('/graphs', helper.loggedIn, function(req, res, next) {
  var renderObject = { title: 'Graphs' };
  if (req.user) {
    renderObject.username = req.user.user_name;
  }
  res.render('dashboard', renderObject);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/users/login');
});

router.post('/profile', helper.loggedIn, function(req, res, next) {
  helper.modifyUser(req, res);
});

module.exports = router;
