/*-----------------------------------[ DEPENDENCIAS ]-----------------------------------*/

var gulp         = require( 'gulp'            );
var rename       = require( 'gulp-rename'     );
var uglify       = require( 'gulp-uglify'     );
var minify_css   = require( 'gulp-minify-css' );
var inject       = require( 'gulp-inject'     );

var run_sequence = require( 'run-sequence'    );
var browser_sync = require( 'browser-sync'    );

/*------------------------------------[ VARIABLES ]-------------------------------------*/

var directorios = 
  {
    global_dependencias : 
      [ 
        './app/dependencias/js/jquery.min.js'        ,
        './app/dependencias/js/angular.min.js'       ,
        './app/dependencias/**/*'                    ,

        './app/js/controller.index.js'               ,
        './app/js/service.*.js'                      ,
        './app/js/factory.*.js'                      ,
        './app/js/controller.*.js'                   ,
        './app/js/routes.*.js'                       ,

        './app/js/*.js'                              ,
        './app/css/*.css'
      ]                                              , 

    global_html         : './app/**/*.html'          ,
    global_css          : './app/**/*.css'           ,
    global_js           : './app/**/*.js'            ,

    dependencias        : './app/dependencias'       ,
    index               : './app/index.html'         ,
    app                 : './app'                    ,
    css                 : './css'                    ,
    js                  : './js'                     ,
    fonts               : './fonts'
  };

var bower_components = 
  {
    global_css   : 
      [
        './bower_components/**/*.min.css'     ,
        '!./bower_components/**/*theme*.css'
      ]                                       ,
    global_js    : 
      [
        './bower_components/**/*.min.js'      ,
        '!./bower_components/**/*slim*.js'  
      ]                                       ,
    global_fonts :
      [
        './bower_components/bootstrap/fonts/*'
      ]
  };

/*-------------------------------------[ SERVIDOR ]-------------------------------------*/

gulp.task( 'servidor' , function( )
  {
    browser_sync(
      {
        server: directorios.app
      } );
    gulp.watch( directorios.global_html ).on( 'change' , browser_sync.reload );
    gulp.watch( directorios.global_css  ).on( 'change' , browser_sync.reload );
    gulp.watch( directorios.global_js   ).on( 'change' , browser_sync.reload );
  } );

/*-----------------------------------[ DEPENDENCIAS ]-----------------------------------*/

gulp.task( 'dependencias' , function( )
  {
    run_sequence( 'copiador_js' , 'copiador_css' , 'copiador_fonts' , 'inyector_index' );
  } );

/*----------------------------[ COPIADORES DE DEPENDENCIAS ]----------------------------*/

gulp.task( 'copiador_js' , function( )
  {
    return gulp.src( bower_components.global_js )
               .pipe( uglify( ) )
               .pipe( rename( function( path ) 
                 {
                   path.dirname = directorios.js; // path.basename.slice( 0 , -4 );
                 } ) )
               .pipe( gulp.dest( directorios.dependencias ) );
  } );

gulp.task( 'copiador_css' , function( )
  {
    return gulp.src( bower_components.global_css )
               .pipe( minify_css( ) )
               .pipe( rename( function( path ) 
                 {
                   path.dirname = directorios.css;
                 } ) )
               .pipe( gulp.dest( directorios.dependencias ) );
  } );

gulp.task( 'copiador_fonts' , function( )
  {
    return gulp.src( bower_components.global_fonts )
               .pipe( rename( function( path ) 
                 {
                   path.dirname = directorios.fonts;
                 } ) )
               .pipe( gulp.dest( directorios.dependencias ) );
  } );

/*----------------------------------[ INYECTOR INDEX ]----------------------------------*/

gulp.task( 'inyector_index' , function( )
  {
    gulp.src( directorios.index )
        .pipe( inject( gulp.src( directorios.global_dependencias , { read: false    } ) ,
                                                                   { relative: true } ) )
        .pipe( gulp.dest( directorios.app ) );
  } );

/*-------------------------------------[ DEFAULT ]--------------------------------------*/

gulp.task( 'default' , [ 'servidor' , 'dependencias' ] );

/*--------------------------------------------------------------------------------------*/