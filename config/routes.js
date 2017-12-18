var express = require('express');
var router = express.Router();
var db = require('./database');
var helper = require('./helpers');

module.exports = passport => {

  router.get('/', helper.loggedIn, function(req, res, next) {
    var renderObject = { title: 'Dashboard', bodyClasses: ['dashboard'] };
    if (req.user) {
      renderObject.username = req.user.user_name;
    }
    res.render('index', renderObject);
  });

  router.get('/login', function(req, res, next) {
    var renderObject = { title: 'Login' };
    var warningMsg = req.flash('error');
    if (warningMsg.length !== 0) { renderObject.warning = warningMsg; }
    res.render('login', renderObject);
  });

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));

  router.get('/users', helper.loggedIn, function(req, res, next) {
    db.getAllUsers()
      .then(users => {
        var renderObject = { title: 'Users', users: users };
        if (req.user) {
          renderObject.username = req.user.user_name;
        }
        res.render('users', renderObject);
      })
      .catch(error => {
        res.render('error', { error: error });
      });
  });

  return router;
};
