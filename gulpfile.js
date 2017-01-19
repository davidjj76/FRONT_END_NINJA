var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');

// config
var sassConfig = {
	compileSassTaskName: 'compile-sass',
	watchFiles: './src/scss/*.scss',
	entryPoint: './src/scss/style.scss',
	dest: './dist/'
};

var jsConfig = {
	concatJsTaskName: 'concat-js',
	watchFiles: './src/js/*.js',
	entryPoint: './src/js/main.js',
	concatFile: 'main.js',
	dest: './dist/'
};

gulp.task('default', [sassConfig.compileSassTaskName, jsConfig.concatJsTaskName], function() {

	// arrancar el servidor de browser sync
	browserSync.init({
		server: './'
	});

	// detecta cambios en style.scss y ejecuta la tarea compile-sass
    gulp.watch(sassConfig.watchFiles, [sassConfig.compileSassTaskName]);

    // detecta cambios en el js y ejecuta la tarea concat-js
    gulp.watch(jsConfig.watchFiles, [jsConfig.concatJsTaskName]);

    // detecta cambios en el html
    gulp.watch('./*.html', function() {
    	// recarga el navegador
    	browserSync.reload();
    	// notificación
    	notify().write('Browser reloaded!!!');
    });
});

// compilar scss
gulp.task(sassConfig.compileSassTaskName, function() {
	gulp.src(sassConfig.entryPoint)							// cargo el scss
	.pipe(sass().on('error', function(error) {
		return notify().write(error);
	}))														// compilo sass
	.pipe(gulp.dest(sassConfig.dest))						// dejo el resultado en ./dist
	.pipe(browserSync.stream())								// recargar css en el navegador
	.pipe(notify('SASS Compiled!!!'));					
});

// concatenar js
gulp.task(jsConfig.concatJsTaskName, function() {
	gulp.src(jsConfig.entryPoint)
	.pipe(tap(function(file) {								// por cada archivo seleccionado
		// lo pasamos por browserify
		file.contents = browserify(file.path).bundle();
	}))
	.pipe(buffer())											// convertimos a buffer
	// .pipe(concat(jsConfig.concatFile))					// ya no hace falta, ya que el entry point es único
	.pipe(gulp.dest(jsConfig.dest))							// copiar a destino
	.pipe(notify('JS Concatenated!!!'))						// notificacion
	.pipe(browserSync.stream());							// recargar el browser
});
