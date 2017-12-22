var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var sassMiddleware = require('node-sass-middleware');

require('dotenv').config();

var passport = require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sassMiddleware({
  root: path.join(__dirname, '..', 'public', 'stylesheets'),
  src: 'sass',
  dest: 'css',
  prefix: '/stylesheets/css',
  outputStyle: 'compressed',
  indentedSyntax: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// front end modules
app.use('/vendor/jquery', express.static(path.join(__dirname, '..', '/node_modules/jquery/dist')));
app.use('/vendor/popper.js', express.static(path.join(__dirname, '..', '/node_modules/popper.js/dist')));
app.use('/vendor/bootstrap', express.static(path.join(__dirname, '..', '/node_modules/bootstrap/dist')));

//session / passport
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('connect-flash')());
require('./config/passport')(passport);

//routes
require('./config/routes')(passport, app);

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
