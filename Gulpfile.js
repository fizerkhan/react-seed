var gulp       = require('gulp'),
    browserify = require('gulp-browserify'),
    concat     = require('gulp-concat'),
    imagemin   = require('gulp-imagemin'),
    sass       = require('gulp-sass'),
    watch      = require('gulp-watch'),
    connect    = require('gulp-connect'),
    clean      = require('gulp-clean');

var ROOT = __dirname + '/build'

gulp.task('clean', function () {
 return gulp.src('build/', {read: false})
        .pipe(clean());
});

gulp.task('styles', function () {
  gulp.src('client/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css/'));
});

gulp.task('scripts', function () {
  gulp.src(['client/js/app.js'])
      .pipe(browserify({
          debug: true,
          transform: [ 'reactify' ]
      }))
      .pipe(gulp.dest('build/js/'));
});

gulp.task('images', function () {
  gulp.src(['client/img/**/*.png', 'client/img/**/*.jpg', 'client/img/**/*.gif'])
      .pipe(imagemin())
      .pipe(gulp.dest('build/img/'));
});

gulp.task('copy', function(){
  gulp.src('client/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
  gulp.watch('client/js/**/*.js', [ 'scripts' ]);
  gulp.watch('client/scss/**/*.scss', [ 'styles' ]);
  gulp.watch('client/img/**/*', [ 'images' ]);
  gulp.watch('client/*.html', [ 'copy' ]);
});

// gulp.task('livereload', function() {
//   gulp.src(['build/css/*.css', 'build/js/*.js', 'build/img/*', 'build/index.html'])
//     .pipe(watch())
//     .pipe(connect.reload());
// });

gulp.task('webserver', function() {
  connect.server({
    livereload: false,
    port: 8000,
    root: ['build']
  });
});

gulp.task('build', [ 'clean', 'styles', 'scripts', 'images', 'copy' ]);
gulp.task('default', ['build', 'webserver', 'watch']);

// Live reload has an issue of loading react.js routes
// gulp.task('default', ['build', 'webserver', 'livereload', 'watch']);
