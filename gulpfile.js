// including plugins
var gulp = require('gulp');
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var minify = require('gulp-minify');

/// compress all module  controllers
gulp.task('compress', function() {
    gulp.src('app/controllers/*.js')
        .pipe(minify({
            ext:{
                min:'.min.js'
            }
        }))
        .pipe(gulp.dest('app/controllers'))
});

// bundle all scripts
gulp.task('script-it', function () {
    gulp.src('app/controllers/*.min.js') // path to your files
        .pipe(concat('modules.min.js'))  // concat and name it "concat.js"
        .pipe(gulp.dest('app'));
});


gulp.task('config', function() {
    gulp.src('app/app.js')
        .pipe(minify({
            ext:{
                min:'.min.js'
            }
        }))
        .pipe(gulp.dest('app'))
});



gulp.task('default',['compress', 'script-it', 'config']);