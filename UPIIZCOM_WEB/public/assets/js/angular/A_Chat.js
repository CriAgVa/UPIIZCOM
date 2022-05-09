(function(){
    var app = angular.module("UPIIZCOM", []);

    app.controller("ChatCtrl", function($scope, $http, $window){
        $scope.salas = [];
        $scope.salasUq = [];
        $scope.saludo = "Sala de Chats";
        $scope.envio = 0;
        $scope.sala;

        $scope.getSalas = function(){
            $http.get("/chats/room")
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        alert("An error has occurred...");
                    }else{
                        $scope.salas = respuesta.data;
                        var aux = [];
                        for (var i = 0; i < $scope.salas.length; i++){
                            aux[i] = $scope.salas[i].sala;
                        }
                        const dataArr = new Set(aux);
                        $scope.salasUq = [...dataArr];
                        
                    }
                 });
        }

        $scope.selectSala = function(num){
            $scope.sala = $scope.salasUq[num];
            $window.location.href = '/chat/s'+$scope.sala;
        }

        $scope.envioArchivo = function(){
            $scope.envio = ( $scope.envio == 1 ) ? 0 : 1;
        }

        $scope.getSalas();
    });
})();