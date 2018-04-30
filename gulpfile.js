var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    babel = require('gulp-babel');

gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.reload({stream: true}))
});

gulp.task('cleanJS', function() {
    return del.sync('app/js/es5');
});

gulp.task('babel', ['cleanJS'], function () {
  return gulp.src("src/js/es6/*.js")
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest("src/js/es5"))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browserSync', function() {
    browserSync({
      server: {
        baseDir: 'src'
      },
      notify:false
    })
});

gulp.task('clean', function() {
    del.sync('dist');
});

gulp.task('img', function() {
    return gulp.src('src/img/*')
      .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({plugins: [{removeViewBox: true}]})
      ]))
      .pipe(gulp.dest('dist/img'));
});


gulp.task('watch', ['browserSync', 'sass', 'img', 'babel'], function() {
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/es6/*.js', ['babel']);
    gulp.watch('src/img/*', browserSync.reload)
});

gulp.task('build',['clean', 'img', 'sass'], function() {
    var js = gulp.src('src/js/es5/*')
      .pipe(gulp.dest('dist/js/es5'));
    var css = gulp.src('src/css/*')
      .pipe(gulp.dest('dist/css'));
    var html = gulp.src('src/*.html')
      .pipe(gulp.dest('dist'));
    var php = gulp.src('src/*.php')
      .pipe(gulp.dest('dist'));
});