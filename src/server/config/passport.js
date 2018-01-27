var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

module.exports = function(passport) {

  passport.use(
    new LocalStrategy(function(username, password, done) {
      User
      .query()
      .where('username', username)
      .first()
      .then(function(user) {
        if (!user) {
          return done(null, false, {message: 'Username does not exist'});
        }
        user.verifyPassword(password, function (error, passwordCorrect) {
          if (error) {
            return done(error);
          }
          if (!passwordCorrect) {
            return done(null, false, {message: 'Passord incorrect'});
          }
          return done(null, user);
        });
      })
      .catch(function(error) {
        return done(error);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User
    .query()
    .findById(id)
    .then(function(user) {
      done(null, user);
    })
    .catch(function(error) {
      return done(error);
    });
  });

};
