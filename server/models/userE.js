var Model = require('objection').Model;
var db = require('../config/database');
var bcrypt = require('bcryptjs');
var promise = require('promise');

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

User.create = (username, password, email, type) => {
  return db.none('INSERT INTO users(user_name, user_password, user_email, user_type) VALUES($1, $2, $3, $4)', [username, password, email, type]);
};

User.addUser = (username, password, email, type = 0) => {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  return User.create(username, hash, email, type);
};

User.comparePassword = (candidatePassword, hash) => {
  return bcrypt.compare(candidatePassword, hash);
};

User.validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

User.uniqueUserEmail = (email) => {
  return db.one('SELECT EXISTS (SELECT * FROM users WHERE user_email = $1)', [email]);
};

User.uniqueUserUsername = (username) => {
  return db.one('SELECT EXISTS (SELECT * FROM users WHERE user_name = $1)', [username]);
};

User.modifyUser = (user) => {
  return db.tx(t => {
    var queries = [];
    if (user.user_name) {
      queries.push(t.none('UPDATE users SET user_name = $1 WHERE user_id = $2', [user.user_name, user.id]));
    }
    if (user.user_email) {
      queries.push(t.none('UPDATE users SET user_email = $1 WHERE user_id = $2', [user.user_email, user.id]));
    }
    if (user.user_image) {
      queries.push(t.none('UPDATE users SET user_image = $1 WHERE user_id = $2', [user.user_image, user.id]));
    }
    return promise.all(queries);
  });
}

module.exports = User;
