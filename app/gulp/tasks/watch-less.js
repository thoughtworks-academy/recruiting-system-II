var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('watch-less', function() {
  livereload.listen();
  gulp.watch(['./source/less/*.less'], ['less'])
});