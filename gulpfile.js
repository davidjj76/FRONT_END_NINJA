var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function() {
	// detecta cambios en style.scss y ejecuta la tarea compile-sass
    gulp.watch('./src/scss/style.scss', ['compile-sass']);
});

gulp.task('compile-sass', function() {
	gulp.src('./src/scss/style.scss')					// cargo el scss
	.pipe(sass().on('error', sass.logError))			// compilo sass
	.pipe(gulp.dest('./dist/'));						// dejo el resultado en ./
});
