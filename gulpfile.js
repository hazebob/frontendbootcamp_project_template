var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function() {
  console.log('hello');
});

gulp.task('sass', function () {
  return gulp.src('assets/css/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'));
});

gulp.task('browser-stream',['sass'], function () {
  return gulp.src([
      'assets/css/*.*',
    ])
    .pipe(browserSync.stream());
});

gulp.task('sync', function() {
  browserSync.init({
    server : './',
    notify: false,
    port : 8088,
  });
  gulp.watch(['assets/css/*.scss', 'assets/css/*.css'], ['browser-stream']);
  gulp.watch("**/*.html").on('change', browserSync.reload);
});

