(function(){
    $( "#enviarDatos" ).click(function() {
        var datos = {"username": $("#boleta").val(), "password": $("#clave").val() }
        $.ajax({
            type: 'post',
            url: '/login',
            data: JSON.stringify( datos ),
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function (data) {
                console.log(data);
            }
        });        
    });
})();