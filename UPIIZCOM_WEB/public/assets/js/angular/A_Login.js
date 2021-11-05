(function(){
    var app = angular.module("UPIIZCOM", []);
    app.controller("LoginCtrl", function( $scope, $http, $window ){
      $scope.makeLogin = function(){
          $http.post("/login", {username:$scope.username, password: $scope.password})
               .then(function(respuesta){
                    if ( respuesta.data.acceso == true ){
                        $window.location.href = "/dashboard";        
                    }else{
                        //Usedes manden mensajes de usuarios no validos
                    }
               }); 
      }
    });  
})();