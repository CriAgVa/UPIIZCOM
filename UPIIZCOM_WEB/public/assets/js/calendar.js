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

var calendar = new FullCalendar.Calendar(document.getElementById("calendar"), {
    customButtons: {
        miBotonHoy: {
            text: 'Hoy',
            click: function() {
                calendar.today();
            }
        }
    },
    dateClick: function(info){
        alert('Clicked on: '+info.dateStr)
        if(evento.style.display === "none"){
            evento.style.display = "block";
        }else{
            evento.style.display = "none";
        }
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
    events: [{
            title: 'Call with Dave',
            start: '2020-11-18',
            end: '2020-11-18',
            className: 'bg-gradient-danger'
        },
        {
            title: 'Lunch meeting',
            start: '2020-11-21',
            end: '2020-11-22',
            className: 'bg-gradient-warning'
        },
        {
            title: 'All day conference',
            start: '2020-11-29',
            end: '2020-11-29',
            className: 'bg-gradient-success'
        },
        {
            title: 'Meeting with Mary',
            start: '2020-12-01',
            end: '2020-12-01',
            className: 'bg-gradient-info'
        },
        {
            title: 'Marketing event',
            start: '2020-12-10',
            end: '2020-12-10',
            className: 'bg-gradient-primary'
        },
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

