var gulp = require('./gulp')([
  'connect',
  'html',
  'less',
  'watch-less',
  'watchify',
  'watch',
  'browserify',
]);

gulp.task('build', ['less', 'browserify']);
gulp.task('combo',['watch-less', 'watchify']);
