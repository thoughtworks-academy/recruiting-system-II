var gulp = require('./gulp')([
  'less',
  'watch-less',
  'watchify',
  'browserify'
]);

gulp.task('build', ['less', 'browserify']);
gulp.task('combo',['watch-less', 'watchify']);
