require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require("express-session"); //Para manejo de sesiones
var logger = require('morgan');
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/UPIIZCOM");

/**
INCLUSIÓN MASIVA DE MODELOS
 */
var fs = require("fs"); //Para hacer una inclusión masiva a la carpeta de modelos

fs.readdirSync( __dirname + '/modelos' ).forEach(function( filename ){
  if (~filename.indexOf('.js')){
      require ( __dirname + '/modelos/' + filename );
  }
});

/**
 FIN INCLUSIÓN MASIVA DE MODELOS
 */

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gruposRouter = require('./routes/vista_grupos');
var grupoRouter = require('./routes/grupos');
var usuarioRouter = require('./routes/usuarios');
var chatsRouter = require('./routes/chats');
var filesRouter = require('./routes/uploads');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({"resave":true, "saveUninitialized":true, "secret":"UPIIZCOM"}));//Inicialización de parámetros de sessión
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grupos', gruposRouter);
app.use('/grupo', grupoRouter);
app.use('/usuario', usuarioRouter);
app.use('/chats', chatsRouter);
app.use('/files', filesRouter);

app.use(require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//app.listen(3010, function(){
//  console.log('Servidor escuchando en', this.address().port);
//});

module.exports = app;
