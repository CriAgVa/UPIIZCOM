(function(){
    var app = angular.module("UPIIZCOM", []);

    app.controller("AndroidCtrl", function( $scope, $http, $window ){
    

      $scope.myFunction = function(){
        const boleta = document.querySelector('#boleta');
        //Sacamos de algun tipo de input
        Android.showToast(JSON.stringify(boleta.value));
      }

      
    });  
})();