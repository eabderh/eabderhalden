var gulp 		= require('gulp');
var plumber 	= require('gulp-plumber');
var jade 		= require('gulp-jade');
var sass 		= require('gulp-sass');
var browserSync = require('browser-sync');


var root = 'test/'
var src_path = root + 'src';
var dest_path = root + 'public';


gulp.task('default', ['browserSync'], function() {
});


gulp.task('browserSync', ['jade', 'sass'], function() {
	browserSync.init({
		server: "./test/public",
		port: 4000
	});
	gulp.watch(dest_path + "**/*.html")
		.on('change', browserSync.reload);
});

gulp.task('jade', function() {
	return gulp.src(src_path + '**/*.jade', {base: src_path})
		.pipe(plumber())
		.pipe(jade())
		.pipe(gulp.dest(dest_path));
});

gulp.task('sass', function () {
	return gulp.src(src_path + '**/*.scss', {base: src_path})
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(dest_path))
		.pipe(browserSync.stream());
});

gulp.watch(src_path + '**/*.jade', ['jade']);
gulp.watch(src_path + '**/*.scss', ['sass']);



