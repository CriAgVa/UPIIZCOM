var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ForoSchema = new Schema({
    sala            : {type:String, default: "unknown"},
    tipo            : {type:String, default: "unknown"},
    descripcion          : {type:String, default:"unknown"},
    texto         : {type:String, default:"-"},
    imagen         : {type:String, default:"/assets/img/foros/default_logo.png"},
    fecha           : {
        dia      : {type:Number, default:0},
        mes       : {type:Number, default:0},
        year  : {type:Number, default:0000},
        hora    : {
            hora : {type:Number, default:00},
            minuto: {type:Number, default:00},
            segundo: {type:Number, default:00}
        }
    },
  });

  const Foro = mongoose.model("M_Foro", ForoSchema, "Foro");
  module.exports = Foro; 