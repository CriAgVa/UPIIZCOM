(function(){

    var element = function(id){
        return document.getElementById(id);
    }
    var res = element('inpResult');
    var res2 = element('inpResult2');
    var res3 = element('inpResult3');
    var res4 = element('inpResult4');
    var opc1 = element('select');

    var app = angular.module("UPIIZCOM", []);

    app.controller("NoticiaCtrl", function($scope, $http, $window){
        $scope.imagenes = [];
        $scope.imagenesUq = [];
        $scope.salas = [];
        $scope.resultnoticia = [];
        $scope.salasUq = [];
        $scope.chat = [];
        $scope.saludo = "Gestor de Noticias";
        $scope.envio = 0;
        $scope.sala;
        $scope.noticia = {};
        $scope.imagen;
        $scope.preimagen;

        $scope.getSalas = function(){
            $http.get("/noticias/room")
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

        $scope.selectSalaNoticia = function(newnoticia){
            //alert( $scope.salas[newforo].sala);
            sala=$scope.salas[newnoticia].sala;
            $window.location.href = '/noticia/s'+sala;
        }

        $scope.selectSala = function(num){
            $scope.sala = $scope.salasUq[num];
            $window.location.href = '/noticias/s'+$scope.sala;
        }

        $scope.envioArchivo = function(){
            $scope.envio = ( $scope.envio == 1 ) ? 0 : 1;
        }


        $scope.getNoticia = function(){
            $http.get("/noticias/")
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

        $scope.getNoticiaEsp = function(dato){
            $http.get("/noticias/s"+dato)
            .then(function(respuesta){
               if (respuesta.data.error != undefined){
                   alert("Ocurrió un error ");
                   console.log(respuesta)
               }else{
                  $scope.resultnoticia = respuesta.data;
               }   
            });
        }


        $window.onload = function(){
            $http.get("/noticias/")
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


        $scope.addNoticia = function(){
            $http.post("/noticias/", $scope.noticia )
                 .then( function( respuesta ){
                     if (respuesta.data.error != undefined){
                        alert("Ocurrió un error");
                     }else{
                        $scope.salas.push( angular.copy( $scope.noticia) );
                        $scope.noticia = {};
                     }   
                 });
        }

        $scope.dummy = function(){
            alert('Entro');
        }

        $scope.preOpc = function(){
            alert(JSON.stringify("Funcion "+opc1.value));
            //$scope.preimagen= opc1.value;
            //return  opc1.value;
        }

        $scope.preImg = function(){
            alert(JSON.stringify("Funcion"+res.value));
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
            $http.get("/files/r/"+dato)
            .then(function(respuesta){
               if (respuesta.data.error != undefined){
                   alert("Ocurrió un error ");
                   console.log(respuesta)
               }else{
                  $scope.imagen = respuesta.data;
                  $scope.imagen = '/assets/img/general/'+$scope.imagen;
                  console.log($scope.imagen);
                  alert(res2.value);
                  alert($scope.imagen);
                  res2.value=$scope.imagen;
               }   
            });
        }

        $scope.editNoticia = function(id){
            $scope.registro_activo = id;
            $scope.noticia         = angular.copy ($scope.salas[id]); 
        }

        $scope.updateNoticia = function(){
            $http.put("/noticias/" + $scope.salas[ $scope.registro_activo ].sala , $scope.noticia)
                 .then(function(respuesta){
                     console.log(respuesta.status);
                    if (respuesta.status != 200){
                        alert("Ocurrió un error");
                    }else{
                        //alert( $scope.foro);
                       // alert( $scope.foro.sala);
                        $scope.salas[ $scope.registro_activo ] = angular.copy ($scope.noticia);
                        $scope.noticia = {};
                        //alert($scope.salas[2].sala);
                    }   
                 });
        }

        $scope.delNoticia = function(id){
            $http.delete("/noticias/" + $scope.salas[id].sala)
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