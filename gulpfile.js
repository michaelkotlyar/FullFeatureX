var gulp = require('gulp');
var gls = require('gulp-live-server');
var jshint = require('gulp-jshint');

gulp.task('default', function() {
    var server = gls('bin/www');
    server.start().then(function(result) {
        console.log('Server exited with result:', result);
        process.exit(result.code);
    });
    gulp.watch(['public/**/*.css', 'public/**/*.html'], function(file) {
        server.notify.apply(server, [file]);
    });
    gulp.watch('bin/www', server.start);
});

gulp.task('static', function() {
    var server = gls.static('static', 3000);
    server.start();
    gulp.watch(['public/**/*.css', 'public/**/*.html'], function(file) {
        server.notify.apply(server, [file]);
    });
});

gulp.task('lint', function() {
  return gulp.src('routes/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }));
});
