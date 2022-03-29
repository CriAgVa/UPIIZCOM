var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FileSchema = new Schema({
    nombreOriginal  : {type:String, default:"unknown"},
    nombreNuevo     : {type:String, default:"unknown"},
    tipo            : {type:String}
  });

  const File = mongoose.model("M_File", FileSchema, "File");
  module.exports = File; 