var express = require('express');
var router = express.Router();

var db = require('../database/');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.any('SELECT * FROM users')
    .then(function(data) {
      res.render('users', { title: 'Users', users: data });
    })
    .catch(function(error) {
      console.log('WEEWOOWEEWOO');
    });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

module.exports = router;
