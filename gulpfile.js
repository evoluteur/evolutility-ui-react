'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var rename = require('gulp-rename');
var pkg = require('./package.json');

var banner = '/**\n  React-Evolutility v<%= pkg.version %>\n\n'+
            '  <%= pkg.homepage %>\n  <%= pkg.copyright %>\n*/\n';

gulp.task('css', function () {
  return gulp.src('./sass/evolutility.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(header(banner, { pkg : pkg }))
    .pipe(rename('react-evolutility.css'))
    .pipe(gulp.dest('./public'));
});

gulp.task('css-min', function () {
  return gulp.src('./sass/evolutility.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(header(banner, { pkg : pkg }))
    .pipe(rename('react-evolutility.min.css'))
    .pipe(gulp.dest('./public'));
});

gulp.task('dep-min', function () {
  return gulp.src('./sass/dependencies.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename('dependencies.min.css'))
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['css', 'css-min', 'dep-min']);

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
