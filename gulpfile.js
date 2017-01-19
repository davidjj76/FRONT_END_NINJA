var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

gulp.task('default', ['compile-sass', 'concat-js'], function() {

	// arrancar el servidor de browser sync
	browserSync.init({
		server: './'
	});

	// detecta cambios en style.scss y ejecuta la tarea compile-sass
    gulp.watch('./src/scss/*.scss', ['compile-sass']);

    // detecta cambios en el js y ejecuta la tarea concat-js
    gulp.watch('./src/js/*.js', ['concat-js']);

    // detecta cambios en el html
    gulp.watch('./*.html', function() {
    	// recarga el navegador
    	browserSync.reload();
    	// notificación
    	notify().write('Browser reloaded!!!');
    });
});

// compilar scss
gulp.task('compile-sass', function() {
	gulp.src('./src/scss/style.scss')					// cargo el scss
	.pipe(sass().on('error', function(error) {
		return notify().write(error);
	}))													// compilo sass
	.pipe(gulp.dest('./dist/'))							// dejo el resultado en ./dist
	.pipe(browserSync.stream())							// recargar css en el navegador
	.pipe(notify('SASS Compiled!!!'));					
});

// concatenar js
gulp.task('concat-js', function() {
	gulp.src('./src/js/*.js')
	.pipe(concat('main.js'))
	.pipe(gulp.dest('./dist'))
	.pipe(notify('JS Concatenated!!!'))
	.pipe(browserSync.stream());
});
