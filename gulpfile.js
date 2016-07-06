var gulp 			= require('gulp');
var plumber 		= require('gulp-plumber');
var jade 			= require('gulp-jade');
var sass 			= require('gulp-sass');
var browserSync 	= require('browser-sync');
var argv 			= require('yargs').argv;
var uglify 			= require('gulp-uglify');
var postcss 		= require('gulp-postcss');
var autoprefixer 	= require('autoprefixer');
var concat 			= require('gulp-concat');
//var jademodules = require('gulp-jade-modules');
//var jsontosass 	= require('gulp-json-to-sass');

var root = argv.d;
var view_path = root + '/view';
var public_path = root + '/public';
var lib_path = root + '/lib';





gulp.task('default', ['browserSync'], function() {
});


gulp.task('browserSync', ['jade', 'sass', 'js'], function() {
	browserSync.init({
		server: public_path,
		port: 4000
	});
	gulp.watch(public_path + "/**/*.html")
		.on('change', browserSync.reload);
});

gulp.task('jade', function() {
	return gulp.src(view_path + '/**/*.jade', {base: view_path})
		.pipe(plumber())
//		.pipe(jademodules({
//			paths: [lib_path]
//		}))
//		.pipe(jade({
//			basedir: '/'
//		}))
		.pipe(jade({
			basedir: root
		}))
		.pipe(gulp.dest(public_path));
});

gulp.task('sass', function () {
	return gulp.src(view_path + '/**/*.scss', {base: view_path})
		.pipe(plumber())
		.pipe(sass({
			includePaths: [lib_path]
		}).on('error', sass.logError))
		.pipe(concat('all.css'))
		.pipe(postcss([
			autoprefixer({
				browsers: ['last 2 versions']
			})
		]))
		.pipe(gulp.dest(public_path))
		.pipe(browserSync.stream());
});

gulp.task('js', function() {
	return gulp.src(view_path + '/**/*.js', {base: view_path})
		.pipe(uglify())
		.pipe(gulp.dest(public_path));
});

gulp.watch([view_path + '/**/*.jade', lib_path + '/**/*.jade'], ['jade']);
gulp.watch([view_path + '/**/*.scss', lib_path + '/**/*.scss'], ['sass']);
gulp.watch([view_path + '/**/*.js', lib_path + '/**/*.js'], ['js']);



