var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventoCalendarSchema = new Schema({
    title          : {type:String, default:"unknown"},
    start           : {type:String},
    end             : {type:String},
    extendedProps   :{
        type            : {type:String},
        group           : {type:String},
        description     : {type:String},
        creator         : {type:String},
        participants    : [ {type:String} ]
    },
    className       :{type:String}
  });

  const EventoCalendar = mongoose.model("M_EventoCalendar", EventoCalendarSchema, "EventoCalendar");
  module.exports = EventoCalendar; 