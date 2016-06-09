var gulp = require('gulp');
var plumber = require('gulp-plumber');
var jade = require('gulp-jade');
var sass = require('gulp-sass');


var root = 'test/'
var src_path = root + 'src';
var dest_path = root + 'public';


gulp.task('default', ['jade', 'sass'], function() {
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
		.pipe(sass())
		.pipe(gulp.dest(dest_path))
});

gulp.watch(src_path + '**/*.jade', ['jade']);
gulp.watch(src_path + '**/*.scss', ['sass']);



