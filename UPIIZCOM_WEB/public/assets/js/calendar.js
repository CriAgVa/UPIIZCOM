var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
if (month < 10){
    month = "0" + month;
}
var day = date.getDate();
if (day < 10){
    day = "0" + day;
}
var currentDate = year + "-" + month + "-" + day;

var evento = document.getElementById("eventoN");
var fechaI = document.getElementById("fechaInicio");
var fechaI_det = document.getElementById("fechaInicio_det");
var evento_detalles = document.getElementById("evento_detalles")
var endDate = document.getElementById("fechaFin");
var endDate_det = document.getElementById("fechaFin_det")
var title = document.getElementById("name");
var title_det = document.getElementById("name_det")
var description = document.getElementById("desc"); 
var descripcion_det = document.getElementById("desc_det");
var type = document.getElementById("type");
var type_det = document.getElementById("type_det");
var group = document.getElementById("group");
var group_det = document.getElementById("group_det");

var boleta = document.getElementById("username");

var active_id;
var creador_evento_activo;

function hide(HideID){
    HideID.style.display = "none";
}

var calendar = new FullCalendar.Calendar(document.getElementById("calendar"), {
    customButtons: {
        miBotonHoy: {
            text: 'Hoy',
            click: function() {
                calendar.today();
            }
        }
    },
    eventClick: function(info){
        if(evento.style.display === "none"){
            evento_detalles.style.display = "block";
        }else{
            evento_detalles.style.display = "none";
        }
        console.log(info.event)
        title_det.value = info.event.title;
        fechaI_det.value = info.event._instance.range.start;
        endDate_det.value = info.event._instance.range.end;
        descripcion_det.value = info.event.extendedProps.description;
        type_det.value = info.event.extendedProps.type;
        active_id = info.event.extendedProps._id;
        creador_evento_activo = info.event.extendedProps.creator;
    },
    dateClick: function(info){
        var year = info.dateStr[0] + info.dateStr[1] + info.dateStr[2] + info.dateStr[3];
        var month = info.dateStr[5] + info.dateStr[6];
        var day = info.dateStr[8] +  info.dateStr[9];
        if(evento.style.display === "none"){
            evento.style.display = "block";
        }else{
            evento.style.display = "none";
        }
        fechaI.value = year + "-" + month + "-"+day;
    },
    locale: 'es-Mx',
    contentHeight: 'auto',
    initialView: "dayGridMonth",
    headerToolbar: {
        start: 'title', // will normally be on the left. if RTL, will be on the right
        center: '',
        end: 'miBotonHoy prev,next' // will normally be on the right. if RTL, will be on the left
    },
    selectable: true,
    editable: true,
    initialDate: currentDate,
    eventSources:[
        {
            url: '/events/calendar2/usr'+boleta.value
        }
    ],
    views: {
        month: {
            titleFormat: {
                month: "long",
                year: "numeric"
            }
        },
        agendaWeek: {
            titleFormat: {
            month: "long",
            year: "numeric",
            day: "numeric"
            }
        },
        agendaDay: {
            titleFormat: {
            month: "short",
            year: "numeric",
            day: "numeric"
            }
        }
    },
});
calendar.render();

function editEvent(){
    document.getElementById('name_det').removeAttribute('readonly');
    document.getElementById('type_det').removeAttribute('readonly');
    document.getElementById('fechaInicio_det').removeAttribute('readonly');
    document.getElementById('fechaFin_det').removeAttribute('readonly');
    document.getElementById('desc_det').removeAttribute('readonly');
    var updt = document.getElementById('updt_event');
    var dlt = document.getElementById('dlt_event');
    dlt.style.display = "block"
    updt.style.display = "block"
}

function deleteEvent(){
    if (creador_evento_activo == boleta.value){
        var xmlDEL = new XMLHttpRequest();
        xmlDEL.open("DELETE", "/events/id"+active_id, true);

        xmlDEL.onreadystatechange = function(){
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
                
            }
        }
        var xmlDEL2 = new XMLHttpRequest();
                xmlDEL2.open("DELETE", "/events/calendar/id"+active_id, true);
                xmlDEL2.onreadystatechange = function(){
                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
                        console.log("Eliminado con exito")
                    }
                }
        xmlDEL2.send()

        xmlDEL.send();
    }else{
        alert("Usted no es el creador de este evento, no puede eliminarlo")
    }
    document.location.reload(true);
}

function newEvent(){
    var e;
    var intgrnts = [];
    //console.log(group.value)

    if(type.value == "Global"){
        e = {
            title: title.value,
            start: fechaI.value,
            end: endDate.value,
            extendedProps: {
                type: type.value,
                description: description.value,
                creator: boleta.value
            },
            className: 'bg-gradient-success'
        }
        registrarEvento(e);
    }else if (type.value == "Grupal"){
        var xmlGET = new XMLHttpRequest();
        xmlGET.open('GET', '/grupo/id'+group.value, true);
        xmlGET.responseType = 'json'
        xmlGET.onreadystatechange = function(){
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
                var group_name = xmlGET.response.nombre;
                var xmlGETParticipantes = new XMLHttpRequest();
                xmlGETParticipantes.open('GET', '/grupo/int'+group.value, true);
                xmlGETParticipantes.responseType = 'json';
                xmlGETParticipantes.onreadystatechange = function(){
                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
                        xmlGETParticipantes.response.forEach(element => {
                            intgrnts.push(element) ;
                            
                        });
                            e = {
                                title: title.value,
                                start: fechaI.value,
                                end: endDate.value,
                                extendedProps: {
                                    type: type.value,
                                    group: group_name,
                                    description: description.value,
                                    participants: intgrnts,
                                    creator: boleta.value
                                },
                                className: 'bg-gradient-info'
                            }
                            console.log(e)
                            registrarEvento(e);
                    }
                }
                xmlGETParticipantes.send()
            }
        }
        
        xmlGET.send();
    }else{
        e = {
            title: title.value,
            start: fechaI.value,
            end: endDate.value,
            extendedProps: {
                type: type.value,
                description: description.value,
                participants: boleta.value,
                creator: boleta.value
            },
            className: 'bg-gradient-primary'
        }
        registrarEvento(e);
    }    
}

function registrarEvento(e){
    var xml = new XMLHttpRequest();
    
    xml.open("POST", "/events", true);
    
    xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    XMLHttpRequest.responseType = 'json'
    
    xml.onreadystatechange = function(){
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
            var id = xml.response;
 
            var xml2 = new XMLHttpRequest();
            xml2.open("POST", "/events/calendar/", true);
            xml2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
            xml2.onreadystatechange = function(){
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
                    console.log("success")
                    document.location.reload(true);
                }
            }
    
            xml2.send("title="+e.title+
                "&start="+e.start+
                "&end="+e.end+
                "&type="+e.extendedProps.type+
                "&description="+e.extendedProps.description+
                "&group="+e.extendedProps.group+
                "&className="+e.className+
                "&participantes="+e.extendedProps.participants+
                "&creador="+e.extendedProps.creator+
                "&id="+id.substring(1, id.length-1)); 
                calendar.addEvent(e);  
                }
    }

    xml.send("nombre="+e.title+
            "&inicio="+e.start+
            "&fin="+e.end+
            "&tipo="+e.extendedProps.type+
            "&descripcion="+e.extendedProps.description+
            "&grupo="+e.extendedProps.group+
            "&participantes="+e.extendedProps.participants+
            "&creador="+e.extendedProps.creator);
}

function registrarEventoCalendario(e){
    var xml2 = new XMLHttpRequest();
    xml2.open("POST", "/events/calendar/", true);
    xml2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xml2.onreadystatechange = function(){
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200){
            console.log("success")
        }
    }
    
    xml2.send("title="+e.title+
        "&start="+e.start+
        "&end="+e.end+
        "&type="+e.extendedProps.type+
        "&description="+e.extendedProps.description+
        "&group="+e.extendedProps.group+
        "&className="+e.className+
        "&participantes="+e.extendedProps.participants+
        "&creador="+e.extendedProps.creator); 
        calendar.addEvent(e);  
}

var ctx1 = document.getElementById("chart-line-1").getContext("2d");
var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);
gradientStroke1.addColorStop(1, 'rgba(255,255,255,0.3)');
gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors
new Chart(ctx1, {
    type: "line",
    data: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "Visitors",
            tension: 0.5,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: "#fff",
            borderWidth: 2,
            backgroundColor: gradientStroke1,
            data: [50, 45, 60, 60, 80, 65, 90, 80, 100],
            maxBarThickness: 6,
            fill: true
        }],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
        scales: {
            y: {
                grid: {
                    drawBorder: false,
                    display: false,
                    drawOnChartArea: false,
                    drawTicks: false,
                },
                ticks: {
                    display: false
                }
            },
            x: {
                grid: {
                    drawBorder: false,
                    display: false,
                    drawOnChartArea: false,
                    drawTicks: false,
                },
                ticks: {
                    display: false
                }
            },
        },
    },
});

