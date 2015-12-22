var gulp = require('./gulp')([
  'less',
  'watch-less',
  'watchify',
  'browserify',
  'livereload'
]);

gulp.task('build', ['less', 'browserify']);
gulp.task('combo',['livereload', 'watch-less', 'watchify']);
