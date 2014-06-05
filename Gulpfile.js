var gulp       = require('gulp'),
    browserify = require('gulp-browserify'),
    concat     = require('gulp-concat'),
    imagemin   = require('gulp-imagemin'),
    sass       = require('gulp-sass'),
    watch      = require('gulp-watch'),
    connect    = require('gulp-connect');

var ROOT = __dirname + '/build'

gulp.task('styles', function () {
  gulp.src('assets/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css/'));
});

gulp.task('scripts', function () {
  gulp.src(['assets/js/app.js'])
      .pipe(browserify({
          debug: true,
          transform: [ 'reactify' ]
      }))
      .pipe(gulp.dest('build/js/'));
});

gulp.task('images', function () {
  gulp.src(['assets/img/**/*.png', 'assets/img/**/*.gif'])
      .pipe(imagemin())
      .pipe(gulp.dest('build/img/'));
});

gulp.task('copy', function(){
  gulp.src('index.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
  gulp.watch('assets/js/**/*.js', [ 'scripts' ]);
  gulp.watch('assets/scss/**/*.scss', [ 'styles' ]);
  gulp.watch('assets/img/**/*', [ 'images' ]);
  gulp.watch('*.html', [ 'copy' ]);
});

gulp.task('livereload', function() {
  gulp.src(['build/css/*.css', 'build/js/*.js', 'build/img/*', 'build/index.html'])
    .pipe(watch())
    .pipe(connect.reload());
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    port: 8000,
    root: ['build']
  });
});

gulp.task('build', [ 'styles', 'scripts', 'images', 'copy' ]);
gulp.task('default', ['build', 'webserver', 'livereload', 'watch']);
