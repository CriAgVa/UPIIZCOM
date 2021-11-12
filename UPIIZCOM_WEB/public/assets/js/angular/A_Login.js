(function(){
    var app = angular.module("UPIIZCOM", []);

    app.controller("LoginCtrl", function( $scope, $http, $window ){
      
      $scope.username = '2019670060';
      $scope.password = 'ChrisAgVa0';

      $scope.makeLogin = function(){
          $http.post("/login", {username:$scope.username, password: $scope.password})
               .then(function(respuesta){
                   console.log(respuesta);
                    if ( respuesta.data.acceso == true ){
                        console.log(respuesta);
                        $window.location.href = "/dashboard";        
                    }else{
                        console.log(respuesta);
                    }
               }); 
      }

      
    });  
})();