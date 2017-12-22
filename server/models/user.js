var db = require('../config/database');
var bcrypt = require('bcryptjs');

var User = {};

User.getAllUsers = () => {
  return db.any('SELECT * FROM users');
};

User.findByUserName = (username) => {
  return db.one('SELECT * FROM users WHERE user_name = $1', [username]);
};

User.findById = (id) => {
  return db.one('SELECT * FROM users WHERE user_id = $1', [id]);
};

User.create = (user) => {
  return db.none('INSERT INTO users(user_name, user_password, user_email, user_type) VALUES($1, $2, $3, $4)', [user.username, user.email, user.password, user.type]);
};

User.addUser = (newUser) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(newUser.password, salt);

  return User.create(newUser.username, hash, newUser.email, newUser.type);
};

User.comparePassword = (candidatePassword, hash) => {
  return bcrypt.compare(candidatePassword, hash);
};

User.validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

User.uniqueEmail = (email) => {
  return db.one('SELECT EXISTS (SELECT * FROM users WHERE email = $1)', [email]);
};

User.uniqueUsername = (username) => {
  return db.one('SELECT EXISTS (SELECT * FROM users WHERE username = $1)', [username]);
};

module.exports = User;
