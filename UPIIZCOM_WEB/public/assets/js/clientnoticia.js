var element = function(id){
    return document.getElementById(id);
}
    
//get elements
//var username = element('username');
var date = new Date();
var room = element('sala');
var sala;
var select = element('slct');
var aux = element('sala');

var uploadB = element('UploadButton'); 
var fileB = element('FileBox'); 
var dataN = element('NameBox'); 

var datos = element('datos');

var form = element('upldButton');
var upld = element('upldFile');
var res = element('inpResult');

var btnres = element('btnResult');


var nombre = element('nombre');
var boleta = element('boleta');
    
    //set default status 


//connect to socket.io
var socket = io.connect('http://localhost:3000', {query: 'num='+datos.value});

    //check for connection
if (socket != undefined){

    console.log('Connected to socket...')
    

    // Get Status from Server
    socket.on('status', function(data){
        //get message status
        setStatus((typeof data === 'object')?data.message : data);

        //if status is clear, clear text
        if(data.clear){

        }
    });

    // Handle Upload
    form.addEventListener('click', function(){
        
        var nombreArchivo;
        var tipoArchivo;
        var aux = upld.files;
        
        nombreArchivo = aux[0].name;
        tipoArchivo = aux[0].type;

        alert(nombreArchivo + "aaaa");
        var username = nombre.value + "(" + boleta.value + ")";

        if(nombreArchivo=="")
        {
            alert("Archivo no seleccionado")
        }
        else{
            socket.emit('input', {
                nombre: username,
                mensaje: nombreArchivo,
                dia: date.getDate(),
                mes: date.getMonth() + 1,
                year: date.getFullYear(),
                hora: date.getHours(),
                minuto: date.getMinutes(),
                segundo: date.getSeconds(),
                sala: datos.value,
                tipo: tipoArchivo
            });
            res.value=nombreArchivo;
        }
       
        //my_func('click'); 
    },true);

    var my_func = function(event) {
        alert("me and all my relatives are owned by China");
        event.preventDefault();
    };
    /////en el upld

    upld.addEventListener('change', function(){
        var nombreArchivo;
        var tipoArchivo;
        var aux = upld.files;
        
        nombreArchivo = aux[0].name;
        tipoArchivo = aux[0].type;

        console.log("Antes "+res.value);
        //res.value='/assets/img/foros/'+nombreArchivo;
        res.value=nombreArchivo;
        
        console.log(res.TEXT_NODE);
        console.log("Despues "+res.value);
        console.log(res);
    });


    btnres.addEventListener('click', function(){
        var inputVal = document.getElementById("inpResult").value;
        alert(inputVal);
        //res.value='nono';
        alert(JSON.stringify(res));
        console.log(res);
        console.log(inputVal);

    });

    form.addEventListener('submit', function(){
        alert('submitio');

    });

    function getInputValue() {

    }

    //Clear Message
    socket.on('cleared', function(){
        
    });
} 