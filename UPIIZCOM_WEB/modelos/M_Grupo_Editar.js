var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var GrupoESchema = new Schema({
    nombre         : {type:String , default:"-"},
    descripcion    : {type:String , default:"no desc"},
    tipo           : {type:String , default:"no espec"},
    imagen         : {type:String , default:"/assets/img/grupos/default_logo.png"},
    integrantes    : {type: Array},
    noIntegrantes  : {type:Number , default:0}
});

//module.exports = mongoose.model('Grupo', GrupoSchema);
//const Story = mongoose.model('Grupo', GrupoSchema);

mongoose.model("M_Grupo_Editar", GrupoESchema, "Grupo");
            //nombre del modelo, variable de estructura, Colección de mongo 