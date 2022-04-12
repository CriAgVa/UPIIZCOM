var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");

var Evento = mongoose.model("M_Evento");
var EventoCalendar = mongoose.model("M_EventoCalendar")

router.get("/", function(req, res){
   Evento.find({})
        .exec( function (error , resultado ){
            if ( error === null ){
               res.json( resultado );
            }else{
               res.json( { status: false , error : error } );
            }
        });
});

router.get("/calendar/", function(req, res){
   EventoCalendar.find({})
      .exec( function (error , resultado ){
         if ( error === null ){
            res.json( resultado );
         }else{
            res.json( { status: false , error : error } );
         }
     });
});

router.post("/", function(req, res){
   console.log(req.body)
   if(req.body.grupo == "undefined"){
      var evento = new Evento({
         nombre: req.body.nombre,
         fecha:{
            inicio: req.body.inicio,
            fin: req.body.fin
         },
         tipo: req.body.tipo,
         descripcion: req.body.descripcion
      });
   }else{
      var evento = new Evento({
         nombre: req.body.nombre,
         fecha:{
            inicio: req.body.inicio,
            fin: req.body.fin
         },
         tipo: req.body.tipo,
         descripcion: req.body.descripcion,
         grupo: req.body.grupo
      });
   }

    evento.save(function (error , resultado ){
        
       if ( error === null ){
          res.json( resultado );
       }else{
          res.json( { status: false , error : error } );
       }
     });
});

router.post("/calendar/", function(req, res){
   console.log(req.body)
   if(req.body.group == "undefined"){
      var evento = new EventoCalendar({
         title: req.body.title,
         start:  req.body.start,
         end: req.body.end,
         extendedProps: {
            type: req.body.type,
            descripcion: req.body.description
         },
         className: req.body.className
      });
   }else{
      var evento = new EventoCalendar({
         title: req.body.title,
         start:  req.body.start,
         end: req.body.end,
         extendedProps: {
            type: req.body.type,
            description: req.body.description,
            group: req.body.group
         },
         className: req.body.className
      });
   }

    evento.save(function (error , resultado ){
        
       if ( error === null ){
          res.json( resultado );
       }else{
          res.json( { status: false , error : error } );
       }
     });
});

module.exports = router;