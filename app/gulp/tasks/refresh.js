var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('refresh', function() {
  nodemon({
      script: 'app',
      ext: 'js sql json',
      ignore: ['public/*']
    })
    .on('restart', function() {
      console.log('restarted!');
    });

});