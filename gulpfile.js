var gulp = require('gulp'),
	gulpJshint = require('gulp-jshint'),
	gulpConcat = require('gulp-concat'),
	gulpSass = require('gulp-sass'),
	config = {
		srcPath: './src',
		destPath: './public/assets'
	};

gulp.task('images', function() {
	gulp.src(config.srcPath + '/images/**/*')
		.pipe(gulp.dest(config.destPath + '/images'));
});

gulp.task('scripts', function() {
	gulp.src(['!' + config.srcPath + '/scripts/lib/external/**/*.js', config.srcPath + '/scripts/**/*.js'])
		.pipe(gulpJshint())
		.pipe(gulpJshint.reporter('default'));

	gulp.src([
		config.srcPath + '/scripts/lib/external/**/*.js',
		config.srcPath + '/scripts/lib/**/*.js',
		config.srcPath + '/scripts/app/Entities/Entity.js',
		config.srcPath + '/scripts/app/**/!(Main)*.js',
		config.srcPath + '/scripts/app/Main.js'
	])
	.pipe(gulpConcat('all.js'))
	.pipe(gulp.dest(config.destPath + '/js'));
});

gulp.task('styles', function () {
    gulp.src([config.srcPath + '/styles/**/*.scss', config.srcPath + '/scripts/app/components/**/*.scss'])
        .pipe(gulpSass())
        .pipe(gulpConcat('all.css'))
        .pipe(gulp.dest(config.destPath + '/css'));
});

gulp.task('watch', function() {
	gulp.watch([config.srcPath + '/scripts/**/*.js'], ['scripts']);
	gulp.watch([config.srcPath + '/styles/**/*.scss', config.srcPath + '/scripts/app/components/**/*.scss'], ['styles']);
	gulp.watch([config.srcPath + '/images/**/*'], ['images']);
});

gulp.task('default', ['scripts', 'styles', 'images']);