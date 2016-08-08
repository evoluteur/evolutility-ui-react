'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var rename = require('gulp-rename');
var pkg = require('./package.json');

var banner = '*/ React-Evolutility */';

gulp.task('sass-evol', function () {
  return gulp.src('./sass/evolutility.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public'));
});
gulp.task('min-evol', function () {
  return gulp.src('./sass/evolutility.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename('evolutility.min.css'))
    .pipe(gulp.dest('./public'));
});
gulp.task('min-dep', function () {
  return gulp.src('./sass/dependencies.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename('dependencies.min.css'))
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['sass-evol', 'min-evol', 'min-dep']);

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
