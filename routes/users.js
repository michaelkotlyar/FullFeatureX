var express = require('express');
var router = express.Router();

var db = require('../database/');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.getAllUsers()
    .then(users => {
      console.log(users);
      res.render('users', { title: 'Users', users: users });
    })
    .catch(error => {
      res.render('error', { error: error });
    });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

module.exports = router;
