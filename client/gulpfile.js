var gulp = require ('gulp');
var uglify = require('gulp-uglify');
var concate = require('gulp-concat');
var rename = require("gulp-rename");
var sass = require("gulp-ruby-sass");
var imagemin = require("gulp-imagemin");

var paths = {
		src: {
			js: 'js/**/*.js',
			css: 'css/**/*.css',
			sass: 'sass/**/*.scss',
			images: 'img/**/*'
		},
		dest: {
			js: 'dist/js',
			css: 'dist/css',
			sass: 'css/',
			images: 'dist/img'
		} 
};

//Scripts Task
gulp.task('scripts', function(){
	//gulp.src('js/**/*.js')
	gulp.src(paths.src.js)
	.pipe(uglify())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest(paths.dest.js));
}); 

//Styles Task
//Compile sass
gulp.task('styles', function(){
	 return sass(paths.src.sass,{
            style: 'compressed'
        })
		.pipe(gulp.dest(paths.dest.sass));
});

/*gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});
*/
//Watch Task
gulp.task('watch', function(){
	gulp.watch(paths.src.js,['scripts']);
	gulp.watch(paths.src.sass,['styles']);
}) 

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts','styles','watch']); 

/*gulp.task('default', function(){
	//console.log('Hello world!');
	gulp.src('js/*.js')
	.pipe(uglify())
	.pipe(rename({ suffix: '.min' }))
	.pipe(gulp.dest('dist/js'));
}); 
*/