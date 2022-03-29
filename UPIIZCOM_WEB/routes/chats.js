var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");

var Chat = mongoose.model("M_Chat");

router.get("/", function(req, res){
    Chat.find({})
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
    Chat.find({sala:req.params.sala})
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
    Chat.find({}, {sala:1, _id:0})
    .sort({sala : 1})
    .exec( function(err, reslt){
        if(err === null){
            res.json(reslt);
        }else{
            res.json({status:false, error:err});
        }
    });
});

module.exports = router;