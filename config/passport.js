var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./database');

passport.serializeUser(function (user, done) {
  done(null, user.user_id);
});

passport.deserializeUser(function (id, done) {
  db.getUserById(id)
  .then((user) => {
    done(null, user);
  })
  .catch((error) => {
    done(new Error(`User with the id ${id} does not exist`));
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.getUser(username)
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(user.user_password === password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
    .catch((error) => {
      console.log(error);
      return done(null, false, { message:'Wrong user name or password.' });
    });;
  }
));

module.exports = passport;
