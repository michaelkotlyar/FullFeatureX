var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var sassMiddleware = require('node-sass-middleware');
var flash = require('connect-flash');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

require('dotenv').config();

var db = require('./database/');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

passport.serializeUser(function (user, done) {
  console.log("serialize " + user);
  done(null, user.user_id);
});

passport.deserializeUser(function (id, done) {
  console.log("deserialize " + id);
  db.getUserById(id)
  .then((user) => {
    done(null, user);
  })
  .catch((error) => {
    done(new Error(`User with the id ${id} does not exist`));
  });
});

// authetication setup
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('localloggies');
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
      console.log("/login: " + error);
      return done(null, false, { message:'Wrong user name or password.' });
    });;
  }
));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  root: path.join(__dirname, 'public', 'stylesheets'),
  src: 'sass',
  dest: 'css',
  prefix: '/stylesheets/css',
  outputStyle: 'compressed',
  indentedSyntax: true
}));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
  // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// front end modules
app.use('/modules/jquery', express.static( __dirname + '/node_modules/jquery/dist'));
app.use('/modules/popper.js', express.static( __dirname + '/node_modules/popper.js/dist'));
app.use('/modules/bootstrap', express.static( __dirname + '/node_modules/bootstrap/dist'));

app.use('/', index);
app.use('/users', users);

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login' })
  );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: err.status + ' Error' });
});

module.exports = app;
