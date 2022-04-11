var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");

var Foro = mongoose.model("M_Foro");


//registro de un nuevo Foro
router.post("/", function( req, res ){
    var foro = new Foro( req.body );
    foro.save(function (error , resultado ){
        console.log(req.body);
        if ( error === null ){
           res.json( resultado );
        }else{
           alert(res.json( { status: false , error : error } ));
        }
    });
});

router.get("/", function(req, res){
    Foro.find({})
        .sort({sala : 1})
        .exec( function(err, reslt){
            if(err === null){
                res.json(reslt);
            }else{
                res.json({status:false, error:err});
            }
        });
});

router.get("/s:sala", function(req, res){
    Foro.find({sala:req.params.sala})
        .sort({sala:1})
        .exec( function(error, resultado){
            console.log(resultado)
            if(error === null){
                res.json(resultado);
            }else{
                res.json({status:false, error:error});
            }
        });
});

router.get("/room", function(req, res){
    Foro.find({}, {sala:1, _id:0})
    .sort({sala : 1})
    .exec( function(err, reslt){
        if(err === null){
            res.json(reslt);
        }else{
            res.json({status:false, error:err});
        }
    });
});

///Eliminasmos Foro
router.delete("/:sala", function(req, res){
    Foro.deleteOne( {sala : req.params.sala } , function(error, resultado){
     if ( error === null ){
        res.json( resultado );
     }else{
        res.json( { status: false , error : error } );
     }
    })
});

router.put("/:sala", function(req, res){
    Foro.updateOne( {sala : req.params.sala} , req.body, function(error, respuesta){
        if ( error === null ){
           res.json(  respuesta );
        }else{
           res.json( { status: false , error : error } );
        }   
    });   
});

module.exports = router;
