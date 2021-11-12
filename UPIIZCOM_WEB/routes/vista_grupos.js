var express = require("express");
var router  = express.Router();

//Conectando a la BD
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/UPIIZCOM");

//Utilizando un Modelo
require("../modelos/M_Grupo.js");
var Grupo = mongoose.model("M_Grupo");

router.get("/", function(req, res, next) {
    var passedVar = req.query.valid;

    res.render('grupos/vistaGrupos', {nombre: passedVar.datos.nombre});
});

module.exports = router;