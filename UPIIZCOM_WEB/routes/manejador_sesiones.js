//middleware para el manejo de sesiones
var _SESSION;

//La función middleware
module.exports = function(){
    return function(req, res, next){
       _SESSION = req.session;

       /**
        * Para mandar las variables de sesión directamente a JADE y poder
        * utilizarlas a placer
        * @autor ovaldez
        * @since 12/11/21
        */

       var originRender = res.render;
       res.render = function(view, locals, callback){
           if ( "function" == typeof locals ){
               callback = locals;
               locals = undefined; 
           }
           if (!locals){
               locals = {};
            }
            locals.req = req;
            originRender.call( res, view, locals, callback);
       };


       /**
        * Fin variables de sesión
        */

       if (_SESSION.ACTIVA){
           next();
       }else{
           //pantalla de error
           res.redirect("/login");
       }
    }
}
