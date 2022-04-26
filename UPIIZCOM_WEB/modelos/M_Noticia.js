var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoticiaSchema = new Schema({
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

  const Noticia = mongoose.model("M_Noticia", NoticiaSchema, "Noticia");
  module.exports = Noticia; 