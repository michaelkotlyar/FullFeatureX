var path = require('path');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var eslint = require('gulp-eslint');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var server = require('tiny-lr')();

//config

var paths = {
  scripts: [
    path.join('src', 'server', '**', '*.js'),
    path.join('src', 'client', 'javascripts', '**', '*.js')
  ],
  styles: [
    path.join('src', 'client', 'stylesheets', 'css', '**', '*.css')
  ],
  views: [
    path.join('src', 'server', 'views', '**', '*.pug')
  ],
  server: 'src/server/server.js'
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
    ['lint'],
    ['lr'],
    ['nodemon'],
    ['watch']
  );
});

//sub tasks

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
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
  gulp.watch(paths.styles, ['styles']);
});
