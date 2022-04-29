var element = function(id){
    return document.getElementById(id);
}
    
//get elements
var Mstatus = element('status');
var messages = element('messages');
//var username = element('username');
var textarea = element('textarea');
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

var nombre = element('nombre');
var boleta = element('boleta');
    
    //set default status 
    var statusDefault = Mstatus.textContent;
    var setStatus = function(s){
        //set status
        Mstatus.textContent = s;

        if(s != statusDefault){
            var delay = setTimeout(function(){
                setStatus(statusDefault);
            }, 4000);
        }
    }

//connect to socket.io
var socket = io.connect('http://localhost:3000', {query: 'num='+datos.value});

    //check for connection
if (socket != undefined){

    console.log('Connected to socket...')
    
    // Hande output
    socket.on('output', function(data){
        data.forEach(element => {
            if (element.sala == datos.value){
                var mensaje = element.mensaje;

                var message = document.createElement('div');
                message.setAttribute('class', 'chat-message');

                var text = document.createElement('div');
                if(element.tipo == "msj"){
                    text.setAttribute('class', 'chat-text');
                    text.textContent = element.mensaje;
                }else{
                    text.setAttribute('class', 'chat-file');
                    var icon = document.createElement('i');
                    var text_content = document.createElement('div');

                    if(element.tipo.includes("image")){
                        icon.className = "fa-solid fa-file-image c-icon";       
                    }else if (element.tipo.includes("text")){
                        icon.className = "fa-solid fa-note-sticky c-icon";
                    }else if (element.tipo.includes("audio")){
                        icon.className = "fa-solid fa-file-audio c-icon";
                    }else if (element.tipo.includes("video")){
                        icon.className = "fa-solid fa-file-video c-icon";
                    }else{
                        icon.className = "fa-regular fa-file c-icon";
                    }
                    text.appendChild(icon);
                        text_content.className = "c-file";
                        text_content.textContent = element.mensaje;
                        text.appendChild(text_content);
                        text.insertBefore(icon, text_content);
                    text.addEventListener('click', () => {
                        window.location.href = "http://localhost:3000/files/downloadCHAT/"+mensaje;
                    });
                }

                var time = document.createElement('div');
                time.setAttribute('class', 'chat-time');

                var name = document.createElement('div');
                name.setAttribute('class', 'chat-name');

                var minuto = element.fecha.hora.minuto;
                switch(minuto){
                    case 0:
                        minuto = '00';
                        break;
                    case 1:
                        minuto = '01';
                        break;
                    case 2:
                        minuto = '02';
                        break;    
                    case 3:
                        minuto = '03';
                        break;
                    case 4:
                        minuto = '04';
                        break;
                    case 5:
                        minuto = '05';
                        break;
                    case 6:
                        minuto = '06';
                        break;
                    case 7:
                        minuto = '07';
                        break;
                    case 8:
                        minuto = '08';
                        break;    
                    case 9:
                        minuto = '09';
                        break;
                    }
                
                time.textContent = element.fecha.hora.hora+":"+minuto;
                name.textContent = element.nombre;
                
                message.appendChild(name);
                message.appendChild(text);
                message.appendChild(time);
                message.insertBefore(text, name);
                message.insertBefore(text, time);
                
                messages.appendChild(message);

                messages.scrollTop = messages.scrollHeight;
            }
        });
        
    });

    // Get Status from Server
    socket.on('status', function(data){
        //get message status
        setStatus((typeof data === 'object')?data.message : data);

        //if status is clear, clear text
        if(data.clear){
            textarea.value = '';
        }
    });

    // Handle Upload
    form.addEventListener('click', function(){
        if(upld.value=="")
        {
            alert("Archivo no seleccionado")
            event.preventDefault();
        }else{
        var nombreArchivo;
        var tipoArchivo;
        var aux = upld.files;
        
        nombreArchivo = aux[0].name;
        tipoArchivo = aux[0].type;

        console.log(nombreArchivo)

        var username = nombre.value + "(" + boleta.value + ")";

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
    }
    });


    // Hande input 
    
    textarea.addEventListener('keydown', function(){
        var username = nombre.value + "(" + boleta.value + ")";
        if(event.which === 13 && event.shiftKey == false){
            // emit to server input
            socket.emit('input', {
                nombre: username,
                mensaje: textarea.value,
                dia: date.getDate(),
                mes: date.getMonth() + 1,
                year: date.getFullYear(),
                hora: date.getHours(),
                minuto: date.getMinutes(),
                segundo: date.getSeconds(),
                sala: datos.value,
                tipo: "msj"
            });
            event.preventDefault();
        }
    });

    //Clear Message
    socket.on('cleared', function(){
        messages.textContent = '';
    });
} 