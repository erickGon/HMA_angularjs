'use strict';

index_controller.config( 
  [ 
    '$stateProvider'     ,
    '$urlRouterProvider' ,
    function( $stateProvider , $urlRouterProvider )
      {
        $urlRouterProvider.otherwise("/home");

        $stateProvider
          .state( 'home' ,
            {
              url          : "/home"           ,
              templateUrl  : "html/home.html"  ,
              controller   : "HomeController" ,
              controllerAs : "home"
            } );
      } 
  ] );