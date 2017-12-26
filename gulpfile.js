var path = require('path');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var runSequence = require('run-sequence');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var server = require('tiny-lr')();

//config

var paths = {
  scripts: [
    path.join('config', '**', '*.js')
  ],
  styles: [
    path.join('public', 'stylesheets', 'css', '**', '*.css')
  ],
  views: [
    path.join('views', '**', '*.pug')
  ],
  server: 'server/bin/www'
};

var lrPort = 35729;

var nodemonConfig = {
  script: paths.server,
  ext: 'html js css',
  ignore: ['node_modules'],
  env: {
    NODE_ENV: 'development'
  }
};

//default task

gulp.task('default', () => {
  runSequence(
    ['jshint'],
    ['jscs'],
    ['lr'],
    ['nodemon'],
    ['watch']
  );
});

//sub tasks

gulp.task('jshint', () => {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jshint({
      esnext: true
    }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jscs', () => {
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'));
});

gulp.task('styles', () => {
  return gulp.src(paths.styles)
    .pipe(plumber());
});

gulp.task('views', () => {
  return gulp.src(paths.views)
    .pipe(plumber());
});

gulp.task('lr', () => {
  server.listen(lrPort, (err) => {
    if (err) {
      return console.error(err);
    }
  });
});

gulp.task('nodemon', () => {
  return nodemon(nodemonConfig);
});

gulp.task('watch', () => {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.scripts, ['jshint', 'jscs']);
  gulp.watch(paths.styles, ['styles']);
});
