(function(){
    var app = angular.module("UPIIZCOM", []);

    app.controller("UsersCtrl", function( $scope, $http ){
        $scope.saludo = "Tabla usuario";
        $scope.usuarios = [];
        $scope.usuario  = {};
        $scope.registro_activo = -1;
        $scope.mostrar = 1;

        $scope.ocultaMuestra = function(){
            $scope.mostrar = ( $scope.mostrar == 1 ) ? 0 : 1;
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
                        alert("Ocurrió un error");
                    }else{
                       $scope.usuarios = respuesta.data;
                    }   
                 });
        }

        $scope.delUsuario = function(id){
            //[ 3, 4, 5, 6 ,6 , 8, 9, 0 ]  splice(2,4)  ::  [ 3, 4, 6,  0 ]         
            //[ 3, 4, 5, 6 ,6 , 8, 9, 0 ]  splice(5,1)  ::  [ 3, 4, 5, 6 ,6 , 9, 0 ]
            //[ [{}, {},{} ] , {} , {} , {}]
            // a[0][1].nombre
            //alert($scope.grupos[id]._id + $scope.grupos[id].nombre)
            $http.delete("/usuario/" + $scope.usuarios[id]._id)
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        alert("Ocurrió un error");
                    }else{
                       //$scope.grupos = respuesta.data;
                       $scope.usuarios.splice( id, 1);
                    }   
                 });
        }

        $scope.editUsuario = function(id){
            $scope.registro_activo = id;
            $scope.usuario         = angular.copy ($scope.usuarios[id]);     
        }


        $scope.updateUsuario = function(){
            $http.put("/grupo/" + $scope.usuarios[ $scope.registro_activo ]._id , $scope.usuario )
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

        $scope.getUsuario();
    });

})();