var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express', color: 'blue' });
});


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
    console.log(respuesta);
    var _SESSION;
    _SESSION = req.session;
    if ( respuesta.data.estatus == 'true' ){
        //El usuario se identificó correctamente con el servicio de GESCO
        _SESSION.ACTIVA = true;
        _SESSION.NOMBRE = respuesta.data.datos.Nombre;
        _SESSION.BOLETA = respuesta.data.datos.boelta;
        _SESSION.EMAIL  = respuesta.data.datos.mail;
        _SESSION.TOKEN  = respuesta.data.datos.token;
        _SESSION.CARRERA = respuesta.data.datos.Carrera;
        res.json({"acceso": true, datos : { nombre: _SESSION.NOMBRE, carrera: _SESSION.CARRERA }})
    }else{
       //No son correctas las credenciales. 
       res.json({"accesso": false})
    }
  }).catch(function(error){
    res.json(error)
  })
});

router.get('/', function(req, res, next) {
  res.render('paginax', { title: 'Express', color: 'blue' });
});

router.get('/pagina', function(req, res, next) {
  res.render('paginax', { title: 'Express', color: 'blue' });
});

router.get('/sidebar', function(req, res, next) {
  res.render('sidebar', { title: 'Express'});
});

router.get('/navbar', function(req, res, next) {
  res.render('navbar', { title: 'Express'});
});

module.exports = router;
