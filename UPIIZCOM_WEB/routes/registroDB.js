var usuarioActivo;
var mongoose = require("mongoose");

//Utilizando un Modelo
var Usuario = mongoose.model("M_Usuario");

module.exports = function(usuario){
    $http.post("/usuario/", usuario)
            .then(function(respuesta){
            if (respuesta.data.error != undefined){
                alert("Ocurrió un error");
                }else{
                usuarios.push( angular.copy( usuario ) );
                usuario = {};
                }   
            });
          
}