var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dashboard', bodyClasses: ['dashboard'] });
});

router.get('/dashboard', function(req, res, next) {
  res.redirect('/');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
