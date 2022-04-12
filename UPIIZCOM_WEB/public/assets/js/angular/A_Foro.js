(function(){
    var app = angular.module("UPIIZCOM", []);

    app.controller("ForoCtrl", function($scope, $http, $window){
        $scope.salas = [];
        $scope.resultforo = [];
        $scope.salasUq = [];
        $scope.chat = [];
        $scope.saludo = "Gestor de Foros";
        $scope.envio = 0;
        $scope.sala;
        $scope.foro = {};

        $scope.getSalas = function(){
            $http.get("/foros/room")
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

        $scope.selectSalaForo = function(newforo){
            //alert( $scope.salas[newforo].sala);
            sala=$scope.salas[newforo].sala;
            $window.location.href = '/foro/s'+sala;
        }

        $scope.selectSala = function(num){
            $scope.sala = $scope.salasUq[num];
            $window.location.href = '/foros/s'+$scope.sala;
        }

        $scope.envioArchivo = function(){
            $scope.envio = ( $scope.envio == 1 ) ? 0 : 1;
        }


        $scope.getForo = function(){
            $http.get("/foros/")
            .then(function(respuesta){
               if (respuesta.data.error != undefined){
                   alert("Ocurrió un error ");
                   console.log(respuesta)
               }else{
                  $scope.salas = respuesta.data;
                 // alert(JSON.stringify(respuesta.data));
               }   
            });
        }

        $scope.getForoEsp = function(dato){
            $http.get("/foros/s"+dato)
            .then(function(respuesta){
               if (respuesta.data.error != undefined){
                   alert("Ocurrió un error ");
                   console.log(respuesta)
               }else{
                  $scope.resultforo = respuesta.data;
               }   
            });
        }


        $window.onload = function(){
            $http.get("/foros/")
            .then(function(respuesta){
               if (respuesta.data.error != undefined){
                   alert("Ocurrió un error ");
                   console.log(respuesta)
               }else{
                  $scope.salas = respuesta.data;

                  
                  //alert(JSON.stringify(respuesta.data));
               }   
            });
        }


        $scope.addForo = function(){
            $http.post("/foros/", $scope.foro )
                 .then( function( respuesta ){
                     if (respuesta.data.error != undefined){
                        alert("Ocurrió un error");
                     }else{
                        $scope.salas.push( angular.copy( $scope.foro) );
                        $scope.foro = {};
                     }   
                 });
        }

        $scope.editForo = function(id){
            $scope.registro_activo = id;
            $scope.foro         = angular.copy ($scope.salas[id]); 
        }

        $scope.updateForo = function(){
            $http.put("/foros/" + $scope.salas[ $scope.registro_activo ].sala , $scope.foro)
                 .then(function(respuesta){
                     console.log(respuesta.status);
                    if (respuesta.status != 200){
                        alert("Ocurrió un error");
                    }else{
                        //alert( $scope.foro);
                       // alert( $scope.foro.sala);
                        $scope.salas[ $scope.registro_activo ] = angular.copy ($scope.foro);
                        $scope.foro = {};
                        //alert($scope.salas[2].sala);
                    }   
                 });
        }

        $scope.delForo = function(id){
            $http.delete("/foros/" + $scope.salas[id].sala)
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        alert("Ocurrió un error");
                    }else{
                       //$scope.grupos = respuesta.data;
                       $scope.salas.splice( id, 1);
                    }   
                 });
        }

        $scope.ocultaMuestra = function(){
            $scope.mostrar = ( $scope.mostrar == 1 ) ? 0 : 1;
        }

        $scope.ocultaMuestra1 = function(){
            $scope.mostrar1 = ( $scope.mostrar1 == 1 ) ? 0 : 1;
        }
        $scope.getSalas();
    });
})();