var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('reload', function() {
    gulp.src('./public/start.html')
        .pipe(livereload());
})

gulp.task('livereload', function() {
    livereload.listen();
    gulp.watch(['./public/*.html', './public/scripts/*.js', './public/css/*.css'], ['reload']);
})