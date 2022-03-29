var express = require("express");
var router  = express.Router();

//Conectando a la BD
var mongoose = require("mongoose");

//Utilizando un Modelo
var Usuario = mongoose.model("M_Usuario");

//retorna todos los usuarios con todos sus atributos
router.get("/", function( req, res ){
   Usuario.find({})
        .sort( { nombre : -1 })
        //.populate("grupos")
        .exec( function (error , resultado ){
            if ( error === null ){
               res.json( resultado );
            }else{
               res.json( { status: false , error : error } );
            }
        });
});

//retorna un usuario (con todos sus atributos) el cual se consulta por boleta
router.get("/fo:id", function(req, res){
   Usuario.findOne({ username : req.params.id }, function (error, resultado){
             if (error === null){
                res.json(resultado);
                
               }else{
                res.json({status:false, error:error});
             }
          });
});


//retorna un usuario (con todos sus atributos) el cual se consulta por id
router.get("/nu:id", function(req, res){
   Usuario.findOne({ _id : req.params.id }, function (error, resultado){
             if (error === null){
                res.json( resultado);
               }else{
                res.json( {status:false, error:error});
             }
          });
});

//retorna todos los usuarios (boleta e id) los cuales se consultan por boleta 
router.get("/blt:id", function( req, res ){
   Usuario.find({username : {$regex : req.params.id}},{username:1, _id:1}).sort({username:1}).exec( function (error , resultado ){
            if ( error === null ){
               res.json( resultado );
            }else{
               res.json( { status: false , error : error } );
            }
        });
});

//registro de un nuevo usuario
router.post("/", function( req, res ){
    var usuario = new Usuario( req.body );
    usuario.save(function (error , resultado ){
        console.log(req.body);
        if ( error === null ){
           res.json( resultado );
        }else{
           res.json( { status: false , error : error } );
        }
    });
});

//eliminacion por id de un usuario en la base de datos  
router.delete("/:id", function(req, res){
    Usuario.remove( {_id : req.params.id } , function(error, resultado){
     if ( error === null ){
        res.json( resultado );
     }else{
        res.json( { status: false , error : error } );
     }
    })
});
  
//actualizacion por id de un usuario en la base de datos
router.put("/:id", function(req, res){
    Usuario.updateOne( {_id : req.params.id} , req.body, function(error, respuesta){
        if ( error === null ){
           res.json(  respuesta );
        }else{
           res.json( { status: false , error : error } );
        }   
    });   
});

module.exports = router;