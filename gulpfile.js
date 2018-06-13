var gulp = require('gulp');
var concat = require('gulp-concat');
var order = require('gulp-order');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
 
gulp.task('scss', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});

gulp.task('js', function() {
    return gulp.src(['script/**/*.js'])
        .pipe(order(['vendor/**/*.js', 'modules/**/*.js']))
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist'));
});
 
gulp.task('scss:watch', function () {
  gulp.watch('./scss/**/*.scss', ['scss']);
});

gulp.task('js:watch', function() {
    gulp.watch('script/**/*.js', ['js']);
});