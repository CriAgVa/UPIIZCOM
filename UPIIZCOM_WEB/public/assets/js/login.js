(function(){
    $( "#enviarDatos" ).click(function() {
        var datos = {"username": $("#boleta").val(), "password": $("#clave").val() }
        var respuesta ; 
       
        $.ajax({
            type: 'post',
            url: '/login',
            data: JSON.stringify( datos ),
            async: false,
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function (data) {
                respuesta = data;
                console.log(data.acceso);
            }
        });        
        
        if ( respuesta.acceso == true ){
            window.location.href = "/dashboard";
        }else{
            //Usedes manden mensajes de usuarios no validos
        }

    });
})();