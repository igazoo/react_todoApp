var gulp          = require('gulp');
var plumber       = require('gulp-plumber');
var notify        = require('gulp-notify');
var browserSync   = require('browser-sync').create();
var webpack       = require('webpack');
var webpackStream = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');
var sass = require('gulp-sass');

gulp.task('webserver', () => {
    connect.server({
        root: config.dest,
        livereload: true,
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 8000
    });
});
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

gulp.task('sass',function(){
  return gulp.src('./src/sass/**/*.scss')
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")

  }))
  .pipe(sass())
  .pipe(gulp.dest('./css'));
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
    gulp.watch(['./src/sass/**/**.sass'],function(){
      gulp.start(['sass']);
    });
    gulp.watch(['./**/*.html', './js/**/*.js','./css/**/**.css'], function (done) {
        browserSync.reload();
        done();
    });
});

gulp.task('default',  gulp.parallel('compile','sass','browser-sync','watch'));
