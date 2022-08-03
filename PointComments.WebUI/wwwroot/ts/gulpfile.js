var gulp = require('gulp');
var ts = require('gulp-typescript');
 
var tsProject = ts.createProject('tsconfig.json');
 
gulp.task('scripts', function() {
    var tsResult = gulp.src("app/**/*.ts") // or tsProject.src()
        .pipe(tsProject());
 
    return tsResult.js.pipe(gulp.dest('js'));
});
 
// gulp.task('watch', ['scripts'], function() {
//     gulp.watch('lib/*.ts', ['scripts']);
// });