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

//es necesario arreglar el $or, para desplegar los eventos globales asi como los eventos a los cuales esta inscrito el usuario
router.get("/calendar2/usr:usr", function(req, res){
   EventoCalendar.find({ $or:[ {extendedProps: {type: "Global"}} , {extendedProps: {creator: req.params.usr}}, {extendedProps:{participants: req.params.usr }} ] })
      .exec( function (error , resultado ){
         console.log
         if ( error === null ){
            res.json( resultado );
         }else{
            res.json( { status: false , error : error } );
         }
     });
});

router.post("/", function(req, res){
   
   if(req.body.grupo == "undefined"){
      if(req.body.tipo == "Personal"){
         var ptc = [{usuario: req.body.participantes}]
         var evento = new Evento({
            nombre: req.body.nombre,
            fecha:{
               inicio: req.body.inicio,
               fin: req.body.fin
            },
            tipo: req.body.tipo,
            descripcion: req.body.descripcion,
            participantes: ptc,
            creador: req.body.creador
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
            creador: req.body.creador
      }); 
      }
      
   }else{
      var ptcpt = req.body.participantes.split(",");
       
      var arr_aux = [];
      for (var i = 0; i < ptcpt.length ; i++){
         var aux = {};
         aux.usuario = ptcpt[i];
         arr_aux[i] = aux;
      }


      var evento = new Evento({
         nombre: req.body.nombre,
         fecha:{
            inicio: req.body.inicio,
            fin: req.body.fin
         },
         tipo: req.body.tipo,
         descripcion: req.body.descripcion,
         grupo: req.body.grupo,
         participantes: arr_aux,
         creador: req.body.participantes
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
      if (req.body.type == "Personal"){
         var evento = new EventoCalendar({
            title: req.body.title,
            start:  req.body.start,
            end: req.body.end,
            extendedProps: {
               type: req.body.type,
               descripcion: req.body.description,
               creator: req.body.creador,
               participants: req.body.creador
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
               descripcion: req.body.description,
               creator: req.body.creador
            },
            className: req.body.className
         });
      }
      
   }else{
      var ptcpt = req.body.participantes.split(",");
      var evento = new EventoCalendar({
         title: req.body.title,
         start:  req.body.start,
         end: req.body.end,
         extendedProps: {
            type: req.body.type,
            description: req.body.description,
            group: req.body.group,
            creator: req.body.creador,
            participants: ptcpt
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