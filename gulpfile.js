'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var rename = require('gulp-rename');
var pkg = require('./package.json');

var beginBanner = '/**\n  Evolutility-React-UI v<%= pkg.version %>\n\n';
var banner = beginBanner + 
    '  <%= pkg.homepage %>\n  <%= pkg.copyright %>\n*/\n';
var bannerDep = beginBanner + 
    '  dependencies: Bootstrap (partial), react-datepicker...\n*/\n';

var sig='  ______          _       _   _ _ _ _\n'+
' |  ____|        | |     | | (_) (_) |\n'+
' | |____   _____ | |_   _| |_ _| |_| |_ _   _\n'+
' |  __\\ \\ / / _ \\| | | | | __| | | | __| | | |\n'+
' | |___\\ V / (_) | | |_| | |_| | | | |_| |_| |\n'+
' |______\\_/ \\___/|_|\\__,_|\\__|_|_|_|\\__|\\__, |\n'+
'                                         __/ |\n'+
'  _    _ _____      _____               |___/ \n'+
' | |  | |_   _|    |  __ \\               | |\n'+
' | |  | | | |  ____| |__) |___  __ _  ___| |_\n'+
' | |  | | | | |____|  _  // _ \\/ _` |/ __| __|\n'+
' | |__| |_| |_     | | \\ \\  __/ (_| | (__| |_\n'+
'  \\____/|_____|    |_|  \\_\\___|\\__,_|\\___|\\__|\n\n'+
' Version '+pkg.version+'\n\n'+ Date()+'\n';

console.log(sig);

gulp.task('css', function () {
  return gulp.src('./sass/evolutility.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(header(banner, { pkg : pkg }))
    .pipe(rename('evolutility-ui-react.css'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('css-min', function () {
  return gulp.src('./sass/evolutility.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(header(banner, { pkg : pkg }))
    .pipe(rename('evolutility-ui-react.min.css'))
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
