(function(){
    var app = angular.module("UPIIZCOM", []);

    app.controller("TablaCtrl", function( $scope, $http ){
        $scope.hola="Ejemplo de Catálogo en Tabla";
        $scope.grupos = [];
        $scope.grupo  = {};
        $scope.registro_activo = -1;
        $scope.mostrar = 1;
        
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
                     }   
                 });
        }

        $scope.getGrupo = function(){
            $http.get("/grupo/")
                 .then(function(respuesta){
                    if (respuesta.data.error != undefined){
                        alert("Ocurrió un error");
                    }else{
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

        $scope.getGrupo();
    });

})();