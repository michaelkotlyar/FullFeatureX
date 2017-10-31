var gulp = require('gulp');
var gls = require('gulp-live-server');

gulp.task('static', function() {
    var server = gls.static('static', 3000);
    server.start();
    gulp.watch(['public/**/*.css', 'public/**/*.html'], function(file) {
        server.notify.apply(server, [file]);
    });
});

gulp.task('custom', function() {
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
