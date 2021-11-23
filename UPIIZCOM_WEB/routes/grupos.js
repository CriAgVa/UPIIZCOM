var express = require("express");
var router  = express.Router();

//Conectando a la BD
var mongoose = require("mongoose");

//Utilizando un Modelo
var Grupo = mongoose.model("M_Grupo");

router.get("/", function( req, res ){
   Grupo.find({})
        .sort( { nombre : -1 })
        .exec( function (error , resultado ){
            if ( error === null ){
               res.json( resultado );
            }else{
               res.json( { status: false , error : error } );
            }
        });
});

router.post("/", function( req, res ){
  var grupo = new Grupo( req.body );
  grupo.save(function (error , resultado ){
     console.log(req.body);
    if ( error === null ){
       res.json( resultado );
    }else{
       res.json( { status: false , error : error } );
    }
  });
});


router.delete("/:id", function(req, res){
  Grupo.remove( {_id : req.params.id } , function(error, resultado){
   if ( error === null ){
      res.json( resultado );
   }else{
      res.json( { status: false , error : error } );
   }
  })
});

router.put("/:id", function(req, res){
   Grupo.updateOne( {_id : req.params.id} , req.body, function(error, respuesta){
      if ( error === null ){
         res.json(  respuesta );
      }else{
         res.json( { status: false , error : error } );
      }   
   });   
});

module.exports = router;