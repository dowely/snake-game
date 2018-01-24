var gulp = require('gulp'),
		postcss = require('gulp-postcss'),
		autoprefixer = require('autoprefixer'),
		cssImport = require('postcss-import');
		
		
gulp.task('styles', function() {
	return gulp.src('./app/styles/styles.css')
			.pipe(postcss([cssImport, autoprefixer]))
			.on('error', function(errorInfo){
				console.log(errorInfo.toString());
				this.emit('end');
			})
			.pipe(gulp.dest('./app/temp/styles'));
});