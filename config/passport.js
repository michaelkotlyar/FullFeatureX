var LocalStrategy = require('passport-local').Strategy;
var db = require('./database');
var bcrypt = require('bcryptjs');

module.exports = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user.user_id);
  });

  passport.deserializeUser(function (id, done) {
    db.getUserById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      return done(error);
    });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      db.getUser(username)
      .then((user) => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        bcrypt.compare(password, user.user_password).then((res) => {
          if (!res) {
              return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      })
      .catch((error) => {
        return done(null, false, { message:'Wrong username or password.' });
      });;
    }
  ));
};
