let gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src(['public/stylesheets/**/*.sass', 'public/stylesheets/**/*.scss'])
        .pipe(sass({ outputStyle: "expanded" }).on('error', sass.logError))
        .pipe(gulp.dest('css'))
});

gulp.task('watch', function() {
    gulp.watch(['public/stylesheets/**/*.sass', 'public/stylesheets**/*.scss'], ['sass']);
});

gulp.task('default', ['watch']);