// gulpfile.js
var gulp      = require( "gulp" );

// Javascript
var webpack   = require( "webpack-stream" );
var rename    = require( "gulp-rename" );
var minify    = require( "gulp-babel-minify" );

// CSS
var less      = require( 'gulp-less' );
var cleanCSS  = require( 'gulp-clean-css' );
var concatCss = require( 'gulp-concat-css' );

// Utility
var path     = require( 'path' );

gulp.task('build-less', () => {
  return gulp.src('./src/less/minui.less')
    .pipe(less({
      	paths: [ path.join(__dirname, 'less') ]
    }))
    .pipe( gulp.dest( "./dist/css" ) )
    .pipe( rename( "minui.css" ) )
    .pipe( gulp.dest('./dist/css') );
});

gulp.task('build-css', ['build-less'], () => {
  return gulp.src( [
      './dist/css/lib/normalize.css',
      './dist/css/minui.css'
    ] )
    .pipe( concatCss("./dist/css/minui.min.css") )
    .pipe( gulp.dest('./') )
    .pipe( cleanCSS({compatibility: 'ie8'}) )
    .pipe( gulp.dest('./') );
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
    gulp.watch('./src/less/*.less', ['build-css']);
    gulp.watch('./src/js/*.js', ['build-js']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['build-css','build-js']);