﻿/* --------- plugins --------- */

var
	gulp        = require('gulp'),
	browserSync = require('browser-sync'),
	// jade = require('gulp-jade'),
	scss = require('gulp-sass'),
	plumber     = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer');

var sys = require('sys')

var exec = require('child_process').exec;

/* --------- paths --------- */

var
	paths = {
		jade : {
			location: 'jade/*.jade',
			compiled: 'jade/*.jade',
			destination: ''
		},

		scss : {
			location    : 'scss/*',
			entryPoint  : 'css/main.css',
			destination: 'css'
		},

		browserSync : {
			baseDir : '',
			watchPaths : ['*.html', 
						  'css/*.css',
						  "scss/*.scss",
						  'js/*.js']
		},

		compile__css : {
			location : 'css/*.css',
			destination : 'css'
		}
	};

/* --------- browser sync --------- */

gulp.task('sync', function() {
	browserSync.init({
		port: 9000,
		server: {
			baseDir: paths.browserSync.baseDir
		}
	});
});

/* --------- jade --------- */

// gulp.task('jade', function() {
// 	gulp.src(paths.jade.compiled)
// 		.pipe(plumber())
// 		.pipe(jade({
// 			pretty: '\t',
// 		}))
// 		.pipe(gulp.dest(paths.jade.destination));
// });


/* --------- scss --------- */

gulp.task('scss', function () {

		var child = exec("rm -r css/*.css", function(error, stdout, stderr) {
			
		})

		gulp.src(paths.scss.location)
    	.pipe(scss().on('error', scss.logError))
    	.pipe(gulp.dest(paths.scss.destination));

});

/* --------- autoprefixer --------- */

gulp.task('autoprefixer', function () {
    gulp.src(paths.compile__css.location)
    	.pipe( autoprefixer({
    		browsers: ['last 15 versions'],
    		cascade: false
    	}))
    	.pipe( gulp.dest(paths.compile__css.destination));

});

/* --------- watch --------- */

gulp.task('watch', function(){
	// gulp.watch(paths.jade.location, ['jade']);
	gulp.watch(paths.scss.location, ['scss']);
	gulp.watch(paths.compile__css.location, ['autoprefixer']);
	setTimeout(function() {
		gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload);
	}, 1000)
});

/* --------- default --------- */

// gulp.task('default', ['jade','sync', 'scss', 'autoprefixer', 'watch']);
gulp.task('default', ['sync', 'scss', 'autoprefixer', 'watch']);


