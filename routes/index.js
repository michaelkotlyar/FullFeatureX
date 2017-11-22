var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dashboard', bodyClasses: ['dashboard'] });
});

/////////////////////////
/* Aesthetic redirects */
/////////////////////////

router.get('/dashboard', function(req, res, next) {
  res.redirect('/');
});

router.get('/login', function(req, res, next) {
  res.redirect('/users/login');
});

module.exports = router;
