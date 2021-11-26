(function(){
    var app = angular.module("UPIIZCOM", []);

    app.controller("TablaCtrl", function( $scope, $http , $window){
        $scope.hola="Ejemplo de Catálogo en Tabla";
        $scope.grupos = [];
        $scope.grupo  = {};
        $scope.registro_activo = -1;
        $scope.mostrar = 1;
        $scope.searchResult;

        $scope.ocultaMuestra = function(){
            $scope.mostrar = ( $scope.mostrar == 1 ) ? 0 : 1;
        }

        $scope.addGrupo = function(){
            $http.post("/grupo/", $scope.grupo )
                 .then( function( respuesta ){
                     if (respuesta.data.error != undefined){
                         alert("Ocurrió un error");
                     }else{
                        $scope.grupos.push( angular.copy( $scope.grupo ) );
                        $scope.grupo = {};
                        $window.location.href = '/grupos';
                     }   
                 });
        }

        $scope.addUsuarioNuevo = function ( usuario ){
            var arreglo_integrantes = new Array(); // = $scope.grupo.integrantes.split(",");
            var arreglo_grupos = new Array();

            $http.get("/usuario/nu"+$scope.searchResult[usuario]._id)
                 .then(function(respuesta){
                    if (respuesta.data.grupos == ""){
                        console.log("usuario sin grupos")
                        arreglo_grupos[0] = $scope.grupo._id;

                        console.log(respuesta)
                        respuesta.data.grupos = arreglo_grupos;
                    }else{
                        console.log("usuario con grupos")

                        arreglo_grupos = respuesta.data.grupos;
                        console.log(arreglo_grupos);
                        arreglo_grupos.push($scope.grupo._id);
                        
                        respuesta.data.grupos = arreglo_grupos;
                    }
                    if ($scope.grupo.integrantes == ""){
                        console.log("grupo sin integrantes")
                        arreglo_integrantes[0] = respuesta.data._id;

                        $scope.grupo.integrantes = arreglo_integrantes;
                        console.log(arreglo_integrantes);
                    }else{
                        console.log("grupo con integrantes")
                        var arrIntAux = new Array;
                        console.log($scope.grupo.integrantes.split(","));
                        arreglo_integrantes = $scope.grupo.integrantes.split(",");
                        arrIntAux.push(arreglo_integrantes);
                        console.log("id "+respuesta.data._id);
                        if (arrIntAux.includes(respuesta.data._id) ){
                            console.log("el usuario ya pertenece a este grupo")
                            arreglo_grupos.push(respuesta.data._id);

                            $scope.grupo.integrantes = $scope.grupo.integrantes;
                            respuesta.data.grupos = arreglo_grupos;
                        }else{
                            console.log("usuario nuevo")
                            console.log(respuesta.data.grupos)
                            arreglo_integrantes.push( respuesta.data._id );

                            $scope.grupo.integrantes = arreglo_integrantes;
                            respuesta.data.grupos = arreglo_grupos;
                        }
                    }
                    console.log($scope.grupo)
                    console.log(respuesta.data)
                    $http.put("/grupo/"+$scope.grupo._id, $scope.grupo )
                        .then(function(respuesta){
                            console.log(respuesta);
                    });
                            
                    $http.put("/usuario/"+respuesta.data._id, respuesta.data)
                        .then(function(respuesta){
                            console.log(respuesta);
                    });
                 });         
        }

        $scope.addUser = function(){
            console.log("=?=========");
            console.log($scope.grupo.integrantes);
            
            var bol = document.getElementById("boleta").value;
            $http.get("/usuario/fo"+bol)
                 .then(function(respuesta){
                     if (respuesta.data.error != undefined){
                        alert("Ocurrio un error");
                     }else{
                        id = respuesta.data._id;
                        $scope.grupo.integrantes.push = id;
                        console.log(id);
                        console.log($scope.grupo.integrantes);
                            $http.put("/grupo/:"+$scope.grupo._id, $scope.grupo )
                                 .then(function(respuesta){
                                     console.log(respuesta);
                                   // $window.location.href = '/grupos';
                                });

                        console.log(respuesta);
                     }
                 });
        }

        $scope.getGrupo = function(){
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

        $scope.delGrupo = function(id){
            //[ 3, 4, 5, 6 ,6 , 8, 9, 0 ]  splice(2,4)  ::  [ 3, 4, 6,  0 ]         
            //[ 3, 4, 5, 6 ,6 , 8, 9, 0 ]  splice(5,1)  ::  [ 3, 4, 5, 6 ,6 , 9, 0 ]
            //[ [{}, {},{} ] , {} , {} , {}]
            // a[0][1].nombre
            //alert($scope.grupos[id]._id + $scope.grupos[id].nombre)
            $http.delete("/grupo/" + $scope.grupos[id]._id)
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        alert("Ocurrió un error");
                    }else{
                       //$scope.grupos = respuesta.data;
                       $scope.grupos.splice( id, 1);
                    }   
                 });
        }

        $scope.editGrupo = function(id){
            $scope.registro_activo = id;
            $scope.grupo           = angular.copy ($scope.grupos[id]);  
        }


        $scope.updateGrupo = function(){
            $http.put("/grupo/" + $scope.grupos[ $scope.registro_activo ]._id , $scope.grupo )
                 .then(function(respuesta){
                     console.log(respuesta.status);
                    if (respuesta.status != 200){
                        alert("Ocurrió un error");
                    }else{
                        $scope.grupos[ $scope.registro_activo ] = angular.copy ( $scope.grupo );
                        $scope.grupo = {};
                    }   
                 });
        }

        $scope.findGrupo = function(id){
            console.log("Activo:" + $scope.registro_activo);
        }

        $scope.actualizacionGrupo = function(){
            console.log($scope.grupo);
            $http.put("/grupo/"+ $scope.grupo._id, $scope.grupo ).then(function(respuesta){
                console.log($scope.grupo._id);
                $window.location.href = '/grupos';
            });
        }

        // Fetch data
        $scope.fetchUsers = function(){   
            var searchText_len = $scope.searchText.trim().length;
            var searchText = $scope.searchText;

            // Check search text length
            if(searchText_len > 0){
            $http.get("/usuario/blt"+searchText)
                .then(function successCallback(respuesta){
                    console.log(respuesta);
                    $scope.searchResult = respuesta.data;
                });
                }else{
                    $scope.searchResult = {};
                }         
        }

        // Set value to search box
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

        $scope.getGrupo();
    });

        

    /*
    $http.get("/usuario/"+bol)
                 .then(function(respuesta){
                     if (respuesta.data.error != undefined){
                        alert("Ocurrio un error");
                     }else{
                        id = respuesta.data._id;respuesta.data;
                        
                        usuario = {
                            _id : respuesta.data._id,
                            tipo : respuesta.data.tipo,
                            username : respuesta.data.username,
                            datos : {
                                nombre : respuesta.data.datos.nombre,
                                email  : respuesta.data.datos.email,
                                noTelefono : respuesta.data.datos.noTelefono,
                                programa : {
                                    carrera: respuesta.data.datos.programa.programa,
                                    semestre : respuesta.data.datos.programa.semestre
                                }
                            },
                            grupos: [
                                {id: $scope.grupo._id}
                            ]
                        };
                        
                        $scope.grupo.integrantes = id;
                        console.log(id);
                        console.log(respuesta);
                            $http.put("/usuario/push"+id, usuario )
                                 .then(function(respuesta){
                                    console.log("id"+$scope.grupo._id);
                                   // $window.location.href = '/grupos';
                                });

                        console.log(respuesta);
                     }
                 });
    */
})();