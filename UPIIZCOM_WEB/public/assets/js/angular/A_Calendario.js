(function(){
    var app = angular.module("UPIIZCOM", []);

    app.controller("CalendarCtrl", function($scope, $http, $window){
        $scope.tipo = "";
        $scope.grupos = [];

        $scope.getGrupos = function(){
            $http.get("/grupo/")
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        alert("Ocurrió un error");
                    }else{
                        console.log(respuesta)
                        $scope.grupos = respuesta.data;
                    }   
                 });
        }

        $scope.getGrupos();
    });
})();