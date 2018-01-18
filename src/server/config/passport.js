var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

module.exports = (passport) => {

  passport.use(
    new LocalStrategy((username, password, done) => {
      User
      .query()
      .where('username', username)
      .first()
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Username does not exist' });
        }
        user.verifyPassword(password, function (error, passwordCorrect) {
          if (error) { return done(error); }
          if (!passwordCorrect) { return done(null, false, { message: 'Passord incorrect' }); }
          return done(null, user);
        });
      })
      .catch((error) => {
        return done(error);
      });
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User
    .query()
    .findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      return done(error);
    });
  });

};
