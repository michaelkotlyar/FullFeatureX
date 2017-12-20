var db = require('./database');
var bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);

module.exports = {
  loggedIn: (req, res, next) => {
    if (!req.user) {
      res.redirect('/login');
    }
    else {
      next();
    }
  },
  createUser: (req, res) => {
    renderObject = { title: "Register" };
    db.uniqueUserUsername(req.body.username)
    .then(data => {
      if (!data[0].exists) {
        db.uniqueUserEmail(req.body.email)
        .then(data => {
          if (!data[0].exists) {
            var hash = bcrypt.hashSync(req.body.password, salt);
            db.registerUser(req.body.username, hash, req.body.email);
            res.redirect('/login');
          }
          else {
            renderObject.warning = 'This email is already taken.';
            res.render('register', renderObject);
          }
        })
        .catch(error => {
          console.log('error: ' + error);
        });
      }
      else {
        renderObject.warning = 'This username is already taken.';
        res.render('register', renderObject);
      }
    })
    .catch(error => {
      console.log('error: ' + error);
    });
  },
  modifyUser: (req, res) => {
    var changeUsername = false, changeEmail = false, changeImage = false;
    if (req.username !== req.body.username && req.username !== '') changeUsername = true;
    if (req.email !== req.body.email && req.email !== '') changeEmail = true;
    if (req.image) changeImage = true;
  }
};
