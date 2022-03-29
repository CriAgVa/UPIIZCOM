var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    nombre          : {type:String, default:"unknown"},
    mensaje         : {type:String, default:"-"},
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
    sala            : {type:String, default: "0"},
    tipo            : {type:String, default: "msj"}
  });

  const Chat = mongoose.model("M_Chat", ChatSchema, "Chat");
  module.exports = Chat; 