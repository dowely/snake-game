var gulp = require('gulp'),
		watch = require('gulp-watch'),
		browserSync = require('browser-sync').create();
		
gulp.task('watch', function() {
	
		browserSync.init({
			notify: false,
			server: {
				baseDir: "app"
			}
		});
	
		watch('./app/index.html', function(){
			console.log('index.html saved..');
			browserSync.reload();
		});
		
		watch('./app/styles/**/*.css', function() {
			gulp.start('cssInject');
		});
		
		watch('./app/scripts/main.js', function() {
			console.log('main.js saved...');
			browserSync.reload();
		});
		
});
		
gulp.task('cssInject', ['styles'], function() {
	return gulp.src('./app/temp/styles/styles.css')
	.pipe(browserSync.stream());
});