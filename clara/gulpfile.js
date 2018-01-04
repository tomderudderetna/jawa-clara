const
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    source = './src',
    destination = './dist'

/* minify HTML */
gulp.task('html', function () {
    gulp.src(source + '/pages/*.html')
        .pipe(plugins.minifyHtml())
        .pipe(gulp.dest(destination + '/pages/'))
})

/* compile SCSS and minify CSS */
gulp.task('css', function () {
    gulp.src(source + '/assets/scss/styles.scss')
        .pipe(plugins.sass())
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(gulp.dest(destination + '/assets/css/'))
})

/* concat JS */
gulp.task('js', function () {
    gulp.src(source + '/assets/js/*.js')
        .pipe(plugins.concat('script.js'))
        // .pipe(plugins.uglify())
        // .on('error', function (err) {
        //     console.log(err.toString())
        // })
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(destination + '/assets/js/'))
})

// gulp.task('es6', function () {
//     gulp.src(source + '/assets/js/*.js')
//         .pipe(babel())
//         .pipe(gulp.dest(destination + '/assets/js/'))
// })
// gulp.task('index', function () {
//     var target = gulp.src(source + '/pages/index.html');
//     var sources = gulp.src([
//         source + '/assets/js/*.js',
//         source + '/assets/scss/*.scss'
//     ], {read: false});
//     return target.pipe(inject(sources))
//         .pipe(gulp.dest('./src'));
// });