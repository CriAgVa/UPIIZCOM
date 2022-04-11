var express = require('express');
const session = require('express-session');
var manejador_sesiones = require("./manejador_sesiones")
var registroDB = require("./registroDB");
var router = express.Router();
var mongoose = require("mongoose");

var sesion = new Object();

const webpush = require("../webpush");
let pushSubscripton;

router.post("/subscription", async (req, res) => {
  pushSubscripton = req.body;
  console.log(pushSubscripton);

  // Respuesta del servidor
  res.status(201).json();
});

router.post("/new-message", async (req, res) => {
  const { message } = req.body;
  const { title } = req.body;
  // Payload Notification
  const payload = JSON.stringify({
    title,
    message 
  });
  res.status(200).json();
  try {
    await webpush.sendNotification(pushSubscripton, payload);
  } catch (error) {
    console.log(error);
  }
});


/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express', color: 'blue' });
});

router.get('/dashboard', manejador_sesiones(), function(req, res, next) {
  res.render('index', {datos: req.session, title: 'Timeline' });
});

router.post("/login", function(req, res, next){
  console.log("ENTRANDO");
  console.log(req.body);
  var axios = require("axios");
  axios.post("http://148.204.142.2/pump/web/index.php/login", {username:req.body.username, password:req.body.password}, 
  {headers:{
     'Content-Type' : 'application/json',
     'Authorization' : 'Bearer 202006080078033'
  }}).then(function(respuesta){ 
    //console.log(respuesta);
    var _SESSION;
    _SESSION = req.session;
    if ( respuesta.data.estatus == 'true' ){
        //El usuario se identificó correctamente con el servicio de GESCO
        _SESSION.ACTIVA = true;
        _SESSION.NOMBRE = respuesta.data.datos.Nombre;
        _SESSION.BOLETA = respuesta.data.datos.boleta;
        _SESSION.EMAIL  = respuesta.data.datos.mail;
        _SESSION.TOKEN  = respuesta.data.datos.token;
        _SESSION.CARRERA = respuesta.data.datos.Carrera;
        console.log(_SESSION);
        res.json({"acceso": true, datos : { nombre: _SESSION.NOMBRE, boleta:_SESSION.BOLETA, carrera: _SESSION.CARRERA, mail:_SESSION.EMAIL }})
        /*
        {{usuario.tipo}}
        {{usuario.username}}
        {{usuario.clave}}
        {{usuario.datos.nombre}}
        {{usuario.datos.email}}
        {{usuario.datos.noTelefono}}
        {{usuario.datos.programa.carrera}}
        */
        
    }else{
       //No son correctas las credenciales.  
       res.json({"acceso": false})
    }
  }).catch(function(error){
    res.json(error)
  })
});

router.get('/', manejador_sesiones(), function(req, res, next) {
  res.render('layoutLogin', { title: 'Express', color: 'blue' });
});

router.get('/pagina',  manejador_sesiones(), function(req, res, next) {
  res.render('paginax', { title: 'Express', color: 'blue' });
});

router.get('/sidebar', manejador_sesiones(), function(req, res, next) {
  res.render('sidebar', { title: 'Express'});
});

router.get('/navbar', manejador_sesiones(), function(req, res, next) {
  res.render('navbar', { title: 'Express'});
});

router.get('/grupos', manejador_sesiones(), function(req, res, next) {
  res.render("grupos/vistaGrupos.jade", {datos: req.session, title: "Grupos"} );
});

router.get('/directorio', manejador_sesiones(), function(re, res, next){
  res.render("chat/directorio", {datos: req.session, title: "Mensajes"});
});

/* GET home page. */
router.get('/chat', manejador_sesiones(), function(req, res, next) {
  res.render('chat/directorio', { title: 'MongoChat', datos: req.session });
});

/* GET home page. */
router.get('/chat/s:sala', manejador_sesiones(),function(req, res, next) {
  var sala = req.params.sala;
  res.render('chat/chat', { title: 'Sala '+sala, datos: req.session, sala: sala });
});

router.get('/nuevoGrupo', manejador_sesiones(), function(req, res, next) {
  res.render("grupos/nuevoGrupo.jade", {datos: req.session, title: "Creacion grupo"} );
});

router.get('/nuevaNotificacion', manejador_sesiones(), function(req, res, next) {
  res.render("notificacion/nuevaNotificacion.jade", {datos: req.session, title: "Gestor de Notificaciones"} );
});

router.get('/FAQ', manejador_sesiones(), function(req, res, next) {
  res.render("FAQ/FAQ.jade", {datos: req.session, title: "Gestor de Notificaciones"} );
});

router.get('/editarGrupo/:id', manejador_sesiones(), function(req, res, next) {
  id = req.params.id;
  //Utilizando un Modelo
  var Grupo = mongoose.model("M_Grupo");
  Grupo.findOne({_id : id})
      .exec( function (error , resultado ){
          console.log(resultado);
          if ( error === null ){
            res.render("grupos/editarGrupo", {datos: req.session, numero: id, grupo: resultado, title: "Edicion grupo"} );
          }else{
            res.json( { status: false , error : error } );
          }
      });
  
});

router.get('/anadirMiembros/:id', manejador_sesiones(), function(req, res, next) {
  id = req.params.id;
  //Utilizando un Modelo
  var Grupo = mongoose.model("M_Grupo_Editar");
  Grupo.findOne({_id : id})
      //.populate("integrantes")
      .exec( function (error , resultado ){
          console.log(resultado.integrantes);
          if ( error === null ){
            console.log(resultado);
            res.render("grupos/anadirMiembros", {datos: req.session, numero: id, grupo: resultado, title: "Edicion grupo"} );
          }else{
            res.json( { status: false , error : error } );
          }
      });
  
});

router.get('/perfilGrupo/:id', manejador_sesiones(), function(req, res, next) {
  id = req.params.id;
console.log("ID")
console.log(req.params.id)
  var Grupo = mongoose.model("M_Grupo");
  Grupo.findOne({_id : id})
       .exec(function (error, resultado){
        if(error === null){
          res.render("grupos/perfilGrupo", {datos: req.session, grupo: resultado, numero: id, title: "Grupos"} );
        }else{
          alert("Ocurrio un error")
        }
       });

  
});

router.get('/perfil', manejador_sesiones(), function(req, res, next) {
  var Usuario = mongoose.model("M_Usuario");
  Usuario.findOne({ username : sesion.boleta })
         .exec( function (error, resultado){
            if (error === null){
              console.log(resultado)
              res.render("perfil/verPerfil", {datos: req.session, title: "Perfil", usuario: resultado} );
            }else{
              res.json( {status:false, error:error});
            }
    });
});

router.get("/logout", function(req, res){
  var _SESSION = req.session;
  _SESSION.ACTIVA = false;
  _SESSION.destroy(function(err){
     if(err){
       console.error(err);
     }else{
       res.redirect("/login");
     }
  });
});

module.exports = router;