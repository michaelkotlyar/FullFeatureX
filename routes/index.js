var express = require('express');
var router = express.Router();
var passport = require('../config/passport');

/* GET home page. */
router.get('/', loggedIn, function(req, res, next) {
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

function loggedIn(req, res, next) {
  if (!req.user) {
    res.redirect('/login');
  }
  else {
    next();
  }
}

module.exports =
  (passport) => {
    router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }));

    return router;
  };
