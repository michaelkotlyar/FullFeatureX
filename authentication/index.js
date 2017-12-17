var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../database/');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new LocalStrategy(
  { passReqToCallback : true },
  function(req, username, password, done) {
    console.log('nerp');
    db.getUser(username)
    .then((user) => {
      console.log(user);
      if (!user) {
        return done(null, false, req.flash('message', 'Incorrect username.'));
      }
      if (user.user_password != password) {
        return done(null, false, req.flash('message', 'Incorrect password.'));
      }
      return done(null, user);
    })
    .catch((error) => {
      return done(error);
    })
  }
));
