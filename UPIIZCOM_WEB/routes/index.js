var express = require('express');
const session = require('express-session');
var manejador_sesiones = require("./manejador_sesiones")
var router = express.Router();

var datos = {nombre: '', boleta:'', email:'', carrera:''};

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express', color: 'blue' });
});

router.get('/dashboard', manejador_sesiones(), function(req, res, next) {
  var _SESSION = req.session;
  res.render('index', { nombre: _SESSION.NOMBRE,  title: 'Timeline', message: 'Timeline'});
});

/*PARAMETROS POR GET
router.get('/parametros', function(req, res, next) {
  console.log(req.query)
  console.log(req.query.busqueda + " otro " + req.query.metodo  );
  res.send("PARAMETROS POR GET");
});

//PARAMETROS POR POST
router.post('/parametros', function(req, res, next) {
  console.log(req.body);
  console.log(req.body.username);
  console.log(req.body.password);
  res.send("PARAMETROS POR POST");
});

//PARAMETROS EN LA URL
router.get('/parametros/:pais/:estado/:municipio', function(req, res, next) {
  console.log(req.params);
  console.log(req.params.pais);
  console.log(req.params.estado);
  console.log(req.params.municipio);
  res.send("PARAMETROS POR URL");
});

*/

/*
  Agarrar los parámetros desde el REQUEST
  Todos los parámetros vienen en JSON
  - Parámetros por POST : req.body
  - Parámetros por GET (query) : req.query
  - Parámetros por Params : req.params
  - Endpoints 
    /getEstados/:pais  --> localhost:3000/getEstados/Mexico
     {
       pais: "México",
       estados : ["Zacatecas", "Colima"...]
     }
*/
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
        datos.nombre = respuesta.data.datos.Nombre;
        datos.boleta = respuesta.data.datos.boleta;
        datos.email = respuesta.data.datos.mail;
        datos.carrera = respuesta.data.datos.Carrera;
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
  //res.redirect('/vista_grupos.js' + datos);
  res.render("grupos/vistaGrupos.jade", {nombre: req.session.NOMBRE } );
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