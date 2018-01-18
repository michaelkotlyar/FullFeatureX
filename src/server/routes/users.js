var express = require('express');
var router = express.Router();
var User = require('../controllers/users');
var helper = require('../config/helpers');

module.exports = (passport) => {

  router.get('/', function(req, res, next) {
    User.getAll()
      .then(users => {
        var renderObject = helper.renderObject(req, {
          title: 'Users',
          users: users
        });
        res.render('users', renderObject);
      })
      .catch(error => {
        res.status(500).send({ error: 'Something failed!' });
      });
  });

  router.get('/register', function(req, res, next) {
    var renderObject = helper.renderObject(req, {
      title: 'Register'
    });
    res.render('register', renderObject);
  });

  router.post('/register', function(req, res, next) {
    User.create(req)
      .then(() => {
        res.redirect('/user/login');
      })
      .catch(error => {
        res.status(500).send({ error: 'Something failed!' });
      });
  });

  router.get('/profile', helper.loggedIn, function(req, res, next) {
    var renderObject = helper.renderObject(req, {
      title: 'Profile',
      bodyClasses: ['profile']
    });
    res.render('profile', renderObject);
  });

  router.post('/profile', helper.loggedIn, function(req, res, next) {
    helper.modifyUser(req, res, next)
      .then(() => {
        res.redirect('/users/profile');
      });
  });

  router.get('/login', function(req, res, next) {
    var renderObject = helper.renderObject(req, {
      title: 'Login'
    });
    var warningMsg = req.flash('error');
    if (warningMsg.length !== 0) { renderObject.warning = warningMsg; }
    res.render('login', renderObject);
  });

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }));

  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/users/login');
  });

  return router;
};
