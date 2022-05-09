(function(){
    var app = angular.module("UPIIZCOM", []);

    app.controller("UsersCtrl", function( $scope, $http , $window){
        $scope.saludo = "Tabla usuarios";
        $scope.usuarios = [];
        $scope.usuario  = {};
        $scope.registro_activo = -1;
        $scope.mostrar = 0;
        $scope.mostrar1 = 1;
        $scope.nombre;

        $scope.grupos = [];

        $scope.ocultaMuestra = function(){
            $scope.mostrar = ( $scope.mostrar == 1 ) ? 0 : 1;
        }

        $scope.ocultaMuestra1 = function(){
            $scope.mostrar1 = ( $scope.mostrar1 == 1 ) ? 0 : 1;
        }

        $scope.addUser = function(){
            $http.post("/usuario/", $scope.usuario )
                 .then( function( respuesta ){
                     if (respuesta.data.error != undefined){
                        alert("Ocurrió un error");
                     }else{
                        $scope.usuarios.push( angular.copy( $scope.usuario ) );
                        $scope.usuario = {};
                     }   
                 });
        }

        $scope.getUsuario = function(){
            $http.get("/usuario/")
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        alert("Ocurrió un error ");
                        console.log(respuesta)
                    }else{
                       $scope.usuarios = respuesta.data;
                    }   
                 });
        }

        $scope.delUsuario = function(id){
            $http.delete("/usuario/" + $scope.usuarios[id]._id)
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        alert("Ocurrió un error");
                    }else{
                       $scope.usuarios.splice( id, 1);
                    }   
                 });
        }

        $scope.editUsuario = function(id){
            $scope.registro_activo = id;
            $scope.usuario         = angular.copy ($scope.usuarios[id]);     
        }


        $scope.updateUsuario = function(){
            $http.put("/usuario/" + $scope.usuarios[ $scope.registro_activo ]._id , $scope.usuario )
                 .then(function(respuesta){
                     console.log(respuesta.status);
                    if (respuesta.status != 200){
                        alert("Ocurrió un error");
                    }else{
                        $scope.usuarios[ $scope.registro_activo ] = angular.copy ( $scope.usuario );
                        $scope.usuario = {};
                    }   
                 });
        }

        $window.onload = function(idx){
            $scope.getGrupos = function(){
                $http.get("/grupo/id"+idx)
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        console.log(respuesta);
                    }else{
                        console.log(respuesta);
                    }
                 });
            }  
        }

        $scope.fetchUsers = function(){   
            var searchText_len = $scope.searchText.trim().length;

            if(searchText_len > 0){
            $http.get("/usuario/blt"+searchText)
                .then(function successCallback(respuesta){
                    $scope.searchResult = response.data;
                });
                }else{
                    $scope.searchResult = {};
                }         
        }

        $scope.setValue = function(index,$event){
            $scope.searchText = $scope.searchResult[index].name;
            $scope.searchResult = {};
            $event.stopPropagation();
        }

        $scope.searchboxClicked = function($event){
            $event.stopPropagation();
        }

        $scope.containerClicked = function(){
            $scope.searchResult = {};
        }
    
        $scope.selectSala = function(num, num2){
            var boleta = $scope.usuarios[num].username;
            var nombre = $scope.usuarios[num].datos.nombre;
            
            var sala; 
            if (boleta < num2){
                sala = boleta + "." + num2;
            }else{
                sala = num2 + "." + boleta;
            }

            $window.location.href = '/chat/s'+sala;
        }

        $scope.getUsuario();
    });

})();