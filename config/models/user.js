var db = require('../database/');
var bcrypt = require('bcryptjs');

var User = {};

User.findByUserName = (userName) => {
  return db.getUser(username);
}

User.findById = (id) => {
  return db.getUserById(id);
}

User.create = (user) => {
  return db.createUser(user.username, user.password, user.email, 0);
}

User.addUser = (newUser) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(newUser.password, salt);

  return User.create(newUser.username, hash, newUser.email);
}

User.comparePassword = (candidatePassword, hash) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
  });
}

User.validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = User;
