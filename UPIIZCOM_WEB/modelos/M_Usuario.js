var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    tipo            : {type:String, default:"unknown"},
    username        : {type:String, default:"user"},
    clave           : {type:String, default:"-"},
    datos           : {
        nombre      : {type:String, default:"-"},
        email       : {type:String, default:"nomail"},
        noTelefono  : {type:Number, default:0},
        programa    : {
            carrera : {type:String, default:"noinfo"},
            semestre: {type:String, dafault:"0"}
        },
    },
    listaNegra      : {type:Array},
    grupos          : {type:Array}
  });

  mongoose.model("M_Usuario", UsuarioSchema, "Usuario");

  //module.exports = mongoose.model('Usuario',UsuarioSchema);
  //const Usuario = mongoose.model('Usuario', UsuarioSchema);