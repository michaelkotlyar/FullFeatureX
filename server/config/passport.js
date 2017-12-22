var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      return done(error);
    });
  });

  passport.use(new LocalStrategy(
    (username, password, done) => {
      User.findByUserName(username)
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        User.comparePassword(password, user.user_password).then((res) => {
          if (!res) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      })
      .catch((error) => {
        return done(null, false, { message:'Wrong username or password.' });
      });
    }
  ));
};
