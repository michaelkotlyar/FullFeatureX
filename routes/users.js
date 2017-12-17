var express = require('express');
var router = express.Router();

var db = require('../config/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.getAllUsers()
    .then(users => {
      res.render('users', { title: 'Users', users: users });
    })
    .catch(error => {
      res.render('error', { error: error });
    });
});

module.exports = router;
