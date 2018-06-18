// gulpfile.js
var gulp     = require( "gulp" );
var webpack  = require( "webpack-stream" );
var rename   = require( "gulp-rename" );
var minify   = require( "gulp-babel-minify" );

var less     = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var path     = require('path');

gulp.task('build-less', () => {
  return gulp.src('./src/less/minui.less')
    .pipe(less({
      	paths: [ path.join(__dirname, 'less') ]
    }))
    .pipe( gulp.dest( "./" ) )
    .pipe( cleanCSS({compatibility: 'ie8'}) )
    .pipe( rename( "minui.min.css" ) )
    .pipe( gulp.dest('./dist/css') );
});

gulp.task( "build-js", function() {
   return gulp.src( "src/js/*.js" )
      .pipe( webpack( require( "./webpack.config.js" ) ) )
      .pipe( gulp.dest( "./" ) )
      .pipe( minify() )
      .pipe( rename( "minui.min.js" ) )
      .pipe( gulp.dest( "dist/js/" ) );
} );

gulp.task('watch', function () {
    gulp.watch('./src/less/*.less', ['build-less']);
    gulp.watch('./src/js/*.js', ['build-js']);
});

gulp.task('default', ['watch']);