'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var rename = require('gulp-rename');
var pkg = require('./package.json');

var beginBanner = '/**\n  React-Evolutility v<%= pkg.version %>\n\n';
var banner = beginBanner + 
    '  <%= pkg.homepage %>\n  <%= pkg.copyright %>\n*/\n';
var bannerDep = beginBanner + 
    '  dependencies: Bootstrap (partial), react-datepicker... %>\n*/\n';

var sig='  ___             _\n'+
' | _ \\___ __ _ __| |_   ___\n'+
' |   / -_) _` / _|  _| |___| \n'+
' |_|_\\___\\__,_\\__|\\__| \n'+
'   ___         _      _   _ _ _ _ \n'+
'  | __|_ _____| |_  _| |_(_) (_) |_ _  _ \n'+
'  | _|\\ V / _ \\ | || |  _| | | |  _| || |\n'+
'  |___|\\_/\\___/_|\\_,_|\\__|_|_|_|\\__|\\_, |\n'+
'                                    |__/ \n'+
' Version '+pkg.version+'\n';

console.log(sig);

gulp.task('css', function () {
  return gulp.src('./sass/evolutility.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(header(banner, { pkg : pkg }))
    .pipe(rename('react-evolutility.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('css-min', function () {
  return gulp.src('./sass/evolutility.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(header(banner, { pkg : pkg }))
    .pipe(rename('react-evolutility.min.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('dep-min', function () {
  return gulp.src('./sass/dependencies.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(header(bannerDep, { pkg : pkg }))
    .pipe(rename('dependencies.min.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('default', ['css', 'css-min', 'dep-min']);
gulp.task('dev', ['css']);

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
