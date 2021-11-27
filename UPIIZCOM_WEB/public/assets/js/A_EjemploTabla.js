(function(){
    var app = angular.module("UPIIZCOM", []);

    app.controller("TablaCtrl", function( $scope, $http , $window){
        $scope.hola="Tabla de grupos";
        $scope.grupos = [];
        $scope.grupo  = {};
        $scope.registro_activo = -1;
        $scope.mostrar = 1;
        $scope.searchResult;
        $scope.integrantes;
        $scope.miembros = [];

        $scope.ocultaMuestra = function(){
            $scope.mostrar = ( $scope.mostrar == 1 ) ? 0 : 1;
        }

        $scope.terminar = function(){
            $window.location.href = '/grupos';
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

        $scope.addUsuarioNuevo = function ( usr ){
            var arreglo_integrantes = new Array(); // = $scope.grupo.integrantes.split(",");
            var arreglo_grupos = new Array();
            var arreglo_grupos_og = new Array();

            var grupo = $scope.grupo;

            var usuario = {};

            var terminado = new Array();
            terminado[0] = false;
            terminado[1] = false;

            $http.get("/usuario/nu"+$scope.searchResult[usr]._id)
                 .then(function(respuesta){
                     usuario = respuesta.data; 
                    console.log("USUARIO")
                     console.log(usuario)
                     console.log("GRUPO")
                     console.log(grupo)

                     console.log((grupo.integrantes.indexOf(usuario._id)))
                    if(grupo.integrantes.indexOf(usuario._id) > -1){ 
                        terminado[0] = false;
                    }else{
                        if (usuario.grupos == ""){
                            console.log("usuario sin grupos");
                            arreglo_grupos.push( grupo._id);                 
                            usuario.grupos = arreglo_grupos;
                            terminado[0] = true;
                        }else{
                            console.log("usuario con grupos");
                            arreglo_grupos = usuario.grupos;
                            arreglo_grupos_og = usuario.grupos;
                            arreglo_grupos.push(grupo._id);
                            usuario.grupos = arreglo_grupos; 
                            terminado[0]=true;
                        }
                    }

                    
                    if (grupo.integrantes == ""){
                        console.log("grupo sin integrantes");
                        arreglo_integrantes.push(usuario._id);
                        grupo.integrantes = grupo.integrantes.split(",");
                        grupo.integrantes = arreglo_integrantes;
                        grupo.noIntegrantes = 1;
                        terminado[1] = true;
                    }else{
                        /*
                        console.log("grupo con integrantes");
                        var bandera;
                        var arrIntAux = new Array();
                        console.log(arreglo_integrantes);
                        arreglo_integrantes.push(grupo.integrantes);
                        console.log(arreglo_integrantes);
                        arrIntAux = arreglo_integrantes;
                        console.log(arrIntAux)
                        console.log(arrIntAux.length)
                        for(var i = 0; i < arrIntAux.length; i++){
                            if (arrIntAux[i] == usuario._id){
                                console.log("TRUE");
                                bandera = true;
                                break;
                            } else {
                                console.log("FALSE");
                                bandera = false;
                            }
                        }

                        if (bandera == true ){
                            console.log("el usuario ya pertenece a este grupo");
                            terminado[0]=false;
                            terminado[1]=false;
                        }else{
                            console.log("usuario nuevo");
                            arreglo_integrantes.push( usuario._id );
                            grupo.integrantes = arreglo_integrantes;
                            grupo.noIntegrantes = grupo.noIntegrantes+1;
                            terminado[1]=false;
                        }

                        */
                        console.log("grupo con integrantes");
                        arreglo_integrantes.push(usuario._id);
                        if(typeof(grupo.integrantes) == "string"){
                            var arrAux = grupo.integrantes.split(",");
                            for (var i = 0; i < arrAux.length; i++){
                                arreglo_integrantes.push( arrAux[i] );
                            }
                        }else{
                            for (var i = 0; i < grupo.integrantes.length; i++){
                                arreglo_integrantes.push( grupo.integrantes[i] );
                            }
                        }
                        
                        grupo.integrantes = arreglo_integrantes;
                        console.log(grupo.noIntegrantes);
                        grupo.noIntegrantes = grupo.noIntegrantes+1;
                        terminado[1]=true;
                    }
                    
                    if (terminado[0] == true && terminado[1] == true){     
                        console.log("ENTRE")
                        $http.put("/usuario/"+usuario._id, usuario)
                            .then(function(respuesta){
                                console.log(respuesta);
                        });
                        $http.put("/grupo/"+grupo._id, grupo )
                            .then(function(respuesta){
                                console.log(respuesta);
                        });
                    }
                 }); 
                 //$window.location.reload();      
        }

        $scope.borrarGrupo = function(id){
            var integrantes = new Array();
            var grupo = $scope.grupos[id];
            var usuario;

            var arrAux = grupo.integrantes;

            integrantes.push(grupo.integrantes);

            var size = Object.keys(arrAux).length;;
            for (var i = 0; i < size; i++){
                var usuario_grupos = new Array();
                console.log(integrantes[0][i]);
                $http.get("/usuario/nu"+integrantes[0][i])
                     .then(function(respuesta){
                         usuario = respuesta.data;
                         usuario_grupos = usuario.grupos;
                         console.log(usuario);
                         var index = usuario_grupos.indexOf(grupo._id);
                         console.log(usuario_grupos);
                         if (index > -1){
                            usuario_grupos.splice(index, 1);
                         }
                         console.log(usuario_grupos);
                         usuario.grupos = usuario_grupos;
                         $http.put("/usuario/"+usuario._id, usuario)
                              .then(function(respuesta){
                                console.log(respuesta);
                              });
                     });
            }
            
            $http.delete("/grupo/" + $scope.grupos[id]._id)
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        alert("Ocurrió un error");
                    }else{
                        $scope.grupos.splice( id, 1);
                    }   
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

        $scope.getGrupoPpl = function(id){
            $scope.mostrar = ( $scope.mostrar == 1 ) ? 0 : 1;
            $http.get("/grupo/ppl"+id)
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        alert("Ocurrio un error");
                    }else{
                        $scope.integrantes = respuesta.data.integrantes;
                        var arrAux;
                        var size; 

                        arrAux = $scope.integrantes;
                        size = Object.keys(arrAux).length;

                        for(var i = 0; i < size; i++){
                            $scope.miembros[i] = $scope.integrantes[i].datos.nombre;
                        }
                        console.log($scope.miembros)
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