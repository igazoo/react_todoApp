var gulp          = require('gulp');
var plumber       = require('gulp-plumber');
var notify        = require('gulp-notify');
var browserSync   = require('browser-sync').create();
var webpack       = require('webpack');
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

gulp.task('compile', function () {
  return gulp.src([
  './src/js/index.js',
  ])
  .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
  .pipe(webpackStream(webpackConfig),null,function(err,stats){
    if(stats.compilation.errors.length > 0){
      notify({
        title: 'webpack error',
        message: stats.compilation.errors[0].error
      });
    }
  })
  .pipe(gulp.dest('js'))
});

// Static server
gulp.task('browser-sync', function(done) {
   browserSync.init({
     server: {
       baseDir: "./"
      }
  });
  done();
});

gulp.task('watch', function () {
    // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    gulp.watch(['./src/js/**/**.js'], gulp.task('compile'));
    gulp.watch(['./**/*.html', './js/**/*.js','./css/**/**.css'], function (done) {
        browserSync.reload();
        done();
    });
});

gulp.task('default',  gulp.parallel('compile','browser-sync','watch'));
