const gulp     = require("gulp");
const less     = require('gulp-less');
const minify   = require("gulp-babel-minify");
const cleanCSS = require('gulp-clean-css');
const path     = require('path');

gulp.task("minify-js", () =>
  gulp.src("./src/js/minui.js")
    .pipe(minify({
      mangle: {
        keepClassName: true
      }
    }))
    .pipe(gulp.dest("./dist/js"))
);

gulp.task('less', () => {
  return gulp.src('./src/less/minui.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less') ]
    }))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-css', ['less'], () => {
  return gulp.src('./dist/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function () {
    gulp.watch('./src/less/minui.less', ['minify-css']);
    gulp.watch('./src/js/minui.js', ['minify-js']);
});

gulp.task('default', ['watch']);