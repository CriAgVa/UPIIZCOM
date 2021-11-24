var express = require('express');
const session = require('express-session');
var manejador_sesiones = require("./manejador_sesiones")
var registroDB = require("./registroDB");
var router = express.Router();

var sesion = new Object();

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express', color: 'blue' });
});

router.get('/dashboard', manejador_sesiones(), function(req, res, next) {
  res.render('index', {datos: sesion, title: 'Timeline' });
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
        res.json({"acceso": true, datos : { nombre: _SESSION.NOMBRE, carrera: _SESSION.CARRERA }})
        sesion = {
          nombre  : req.session.NOMBRE,
          boleta  : req.session.BOLETA, 
          programa: req.session.CARRERA,
          semestre: req.session.SEMESTRE,
          email   : req.session.EMAIL
        };
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
  res.render("grupos/vistaGrupos.jade", {datos: sesion, title: "Grupos"} );
});

router.get('/nuevoGrupo', manejador_sesiones(), function(req, res, next) {
  res.render("grupos/nuevoGrupo.jade", {datos: sesion, title: "Creacion grupo"} );
});

router.get('/editarGrupo/=:id', manejador_sesiones(), function(req, res, next) {
  id = req.params.id;
  res.render("grupos/editarGrupo", {datos: sesion, numero: id, title: "Edicion grupo"} );
});

router.get('/perfilGrupo/=:id', manejador_sesiones(), function(req, res, next) {
  id = req.params.id;
  res.render("grupos/perfilGrupo", {datos: sesion, numero: id, title: "Grupos"} );
});

router.get('/perfil', manejador_sesiones(), function(req, res, next) {
  res.render("perfil/verPerfil.jade", {datos: sesion, title: "Perfil"} );
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