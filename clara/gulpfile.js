const gulp 			= require('gulp')
const plugins 		= require('gulp-load-plugins')()

const source 		= './src';
const destination 	= './dist';

gulp.task('css', function () {
    return gulp.src(source + '/assets/css/styles.scss')
        .pipe(plugins.sass())
        .pipe(gulp.dest(destination + '/assets/css/'));
});