var express = require('express');
var router = express.Router();
var passport = require('../config/passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dashboard', bodyClasses: ['dashboard'] });
});

router.get('/dashboard', function(req, res, next) {
  res.redirect('/');
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'Login',
    message: req.flash('error')
  });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
