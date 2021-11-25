var express = require("express");
var router  = express.Router();

//Conectando a la BD
var mongoose = require("mongoose");

//Utilizando un Modelo
var Usuario = mongoose.model("M_Usuario");

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

router.get("/:id", function(req, res){
   Usuario.findOne({ username : req.params.id }, function (error, resultado){
             if (error === null){
                res.json( resultado);
             }else{
                res.json( {status:false, error:error});
             }
          });
});

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

router.delete("/:id", function(req, res){
    Usuario.remove( {_id : req.params.id } , function(error, resultado){
     if ( error === null ){
        res.json( resultado );
     }else{
        res.json( { status: false , error : error } );
     }
    })
});
  
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