'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

gulp.task('build', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './js/main.js',
    debug: true
  });

  return b.transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(source('main.bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('js/*.js', ['build']);
});
