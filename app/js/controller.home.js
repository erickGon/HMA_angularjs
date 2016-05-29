'use strict';

index_controller.controller( 'HomeController' , 
  [ 
    '$state' ,
    'Texts'  ,
    function( $state , Texts )
      {
        var vm = this;

        vm.x        = true;
        vm.language = Texts.español;
        vm.showModal = false;

        vm.translate = function ()
          {
            if ( vm.x )
              {
                vm.language = Texts.español;
              }
            else
              {
                vm.language = Texts.english;
              }
            return vm.changeValue();
          }

        vm.changeValue = function()
          {
            vm.x = !vm.x
          }

      vm.toggleModal = function() 
        {
           vm.showModal = !vm.showModal;

           if ( vm.showModal && $( window ).width() < 768 )
            { 
              $( '#boton' ).click();
            }
            
        }

      }
  ] );