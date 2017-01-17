var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();

gulp.task('default', ['compile-sass'], function() {

	// arrancar el servidor de browser sync
	browserSync.init({
		server: './'
	});

	// detecta cambios en style.scss y ejecuta la tarea compile-sass
    gulp.watch('./src/scss/*.scss', ['compile-sass']);

    // detecta cambios en el html
    gulp.watch('./*.html', function() {
    	// recarga el navegador
    	browserSync.reload();
    	// notificación
    	notify().write('Browser reloaded!!!');
    });
});

gulp.task('compile-sass', function() {
	gulp.src('./src/scss/style.scss')					// cargo el scss
	.pipe(sass().on('error', function(error) {
		return notify().write(error);
	}))													// compilo sass
	.pipe(gulp.dest('./dist/'))							// dejo el resultado en ./dist
	.pipe(browserSync.stream())							// recargar css en el navegador
	.pipe(notify('SASS Compiled!!!'));					
});
