const
    gulp = require('gulp'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    babel = require("gulp-babel"),
    plugins = require('gulp-load-plugins')(),
    minifyHtml = require("gulp-minify-html"),
    minifyCss = require("gulp-minify-css"),
    uglify = require("gulp-uglify"),
    source = './src',
    destination = './dist'

/* compile */
gulp.task('css', function () {
    gulp.src(source + '/assets/scss/styles.scss')
        .pipe(plugins.sass())
        .pipe(gulp.dest(destination + '/assets/css/'))
})
// gulp.task('es6', function () {
//     gulp.src(source + '/assets/js/*.js')
//         .pipe(babel())
//         .pipe(gulp.dest(destination + '/assets/js/'))
// })
gulp.task('js', function () {
    gulp.src(source + '/assets/js/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest(destination + '/assets/js/'))
})

/* minify */
gulp.task('minify-html', function () {
    gulp.src(source + '/pages/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest(destination + '/pages/'))
})
gulp.task('minify-css', function () {
    gulp.src(destination + '/assets/css/styles.css')
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(destination + '/assets/css/'))
})
gulp.task('minify-js', function () {
    gulp.src(destination + '/assets/js/script.js')
        .pipe(uglify())
        .on('error', function (err) { console.log(err.toString()) })
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(destination + '/assets/js/'))
})