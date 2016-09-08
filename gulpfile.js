var gulp = require('gulp'),
    uncss = require('gulp-uncss');

gulp.task('default', function() {
    return gulp.src(['./css/style.css', './css/bootstrap.css', './css/font-awesome.min.css'])
        .pipe(uncss({
            html: ['index.html']
        }))
        .pipe(gulp.dest('./dist'));
});
