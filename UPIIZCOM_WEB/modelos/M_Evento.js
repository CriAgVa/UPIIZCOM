var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventoSchema = new Schema({
    nombre          : {type:String, default:"unknown"},
    fecha           : {
        inicio      : {type:String},
        fin         : {type:String}
    },
    tipo            : {type:String},
    grupo           : {type:String},
    descripcion     : {type:String},
    participantes   : [{
        usuario : {type:String}
    }]
  });

  const Evento = mongoose.model("M_Evento", EventoSchema, "Evento");
  module.exports = Evento; 