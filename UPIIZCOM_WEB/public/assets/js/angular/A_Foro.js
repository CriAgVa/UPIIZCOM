(function(){

    var element = function(id){
        return document.getElementById(id);
    }
    var res = element('inpResult');
    var res2 = element('inpResult2');
    var res3 = element('inpResult3');
    var res4 = element('inpResult4');

    var app = angular.module("UPIIZCOM", []);

    app.controller("ForoCtrl", function($scope, $http, $window){
        $scope.imagenes = [];
        $scope.imagenestemp;
        $scope.imagenesUq = [];
        $scope.salas = [];
        $scope.resultforo = [];
        $scope.salasUq = [];
        $scope.chat = [];
        $scope.saludo = "Gestor de Foros";
        $scope.envio = 0;
        $scope.sala;
        $scope.foro = {};
        $scope.imagen;
        $scope.preimagen;

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
        $scope.getImagenes = function(){
            $http.get("/files")
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        alert("An error has occurred...");
                    }else{
                        $scope.imagenes = respuesta.data;
                        var aux = [];
                        for (var i = 0; i < $scope.imagenes.length; i++){
                            aux[i] = $scope.imagenes[i].nombreOriginal;
                        }
                        const dataArr = new Set(aux);

                        $scope.imagenesUq = [...dataArr];
                        
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

        $scope.dummy = function(){
            alert('Entro');
        }

        $scope.preImg = function(){
            //alert(JSON.stringify("Funcion"+res.value));
            $scope.preimagen= res.value;
            return  res.value;
        }
        
        $scope.despUrl = function(){
            if(res2.value=='')
            {
            res2.value='/assets/img/general/default_logo.png';
            }
                return  res2.value;
            
        }

        $scope.imgID = function(dato){
            if(dato=="undefined")
            {
                  $scope.imagen = '/assets/img/general/default_logo.png';
                  console.log($scope.imagen);
                  //alert(res2.value);
                  //alert($scope.imagen);
                  alert("Imagen seleccionada: "+dato);
                  res2.value=$scope.imagen;
            }else{
            $http.get("/files/r/"+dato)
            .then(function(respuesta){
               if (respuesta.data.error != undefined){
                   alert("Ocurrió un error ");
                   console.log(respuesta)
               }else{
                  $scope.imagen = respuesta.data;
                  $scope.imagen = '/assets/img/general/'+$scope.imagen;
                  console.log($scope.imagen);
                  //alert(res2.value);
                  //alert($scope.imagen);
                  alert("Imagen seleccionada: "+dato);
                  res2.value=$scope.imagen;
               }   
            });
        }
        res2.value=$scope.imagen;
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