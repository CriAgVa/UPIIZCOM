var mongoose = require("mongoose");
var schema   = mongoose.Schema;

var GruposSchema = new schema({
    nombre         : { type:String , default:"-"},
    descripcion    : { type:String , default:"no desc"},
    //imagen         : { type:String , default:"/assets/img/grupos//default_grupo.png"},
    participantes  : { type:Number , default:1}
});

mongoose.model("M_Grupo", GruposSchema, "Grupo");
            //nombre del modelo, variable de estructura, Colección de mongo 

