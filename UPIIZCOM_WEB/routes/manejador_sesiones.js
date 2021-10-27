//middleware para el manejo de sesiones
var _SESSION;

//La función middleware
module.exports = function(){
    return function(req, res, next){
       _SESSION = req.session;
       if (_SESSION.ACTIVA){
           next();
       }else{
           //pantalla de error
           res.redirect("/login");
       }
    }
}
