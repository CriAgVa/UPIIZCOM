(function(){
    var app = angular.module("UPIIZCOM", []);

    app.controller("LoginCtrl", function( $scope, $http, $window ){
      $scope.usuarios = [];
      $scope.username = '2019670060';
      $scope.password = 'ChrisAgVa0';
      
      /////Funcion para el logueo
      $scope.makeLogin = function(){
        $http.post("/login", {username:$scope.username, password: $scope.password})
             .then(function(respuesta){/////////////Empiezan las cosas con datos para la respuesta desde la pagina
                 console.log(respuesta);
                  if ( respuesta.data.acceso == true ){/// Existen los datos en gesco
                    /////////////////////////////////////Inicia el get para sacar los datos dada la boleta
                    $http.get("/usuario/fo"+$scope.username,{username:$scope.username, password: $scope.password})//Esta linea checa la existencia del usuario en la bd
                    .then(function(respuesta2){////Si el resultado da nulo agregamos los datos del usuario logueado
                       if (respuesta2.data == null){//Verificamos que en la consulta se reciva null (nada)
                        $scope.usuario  = {
                       username        : respuesta.data.datos.boleta,
                       clave           : $scope.password,
                       datos           : {
                           email       : respuesta.data.datos.mail,
                           nombre      : respuesta.data.datos.nombre,
                           programa    : {
                               carrera : respuesta.data.datos.carrera,
                           },
                       }
                     };
                     $scope.addUser();
                     $window.location.href = "/dashboard"; 
                     
                       }else{///En cualquier otro caso tenemos acceso directo a la plataforma
                        $window.location.href = "/dashboard"; 
                        
                        } 
                    });                      
                  }else{////Los datos de logueo no existen en GESCO
                      console.log(respuesta);
                  }
             }); 
    }


      $scope.myFunction = function(){
        const boleta = document.querySelector('#boleta');
        //Sacamos de algun tipo de input
        Android.showToast(JSON.stringify(boleta.value));
      }
     
      $scope.addUser = function(){
        $http.post("/usuario/", $scope.usuario )
             .then( function( respuesta ){
                 if (respuesta.data.error != undefined){
                    alert("Ocurrió un error");
                 }else{
                 
                    $scope.usuarios.push( angular.copy($scope.usuario) );
                    $scope.usuario = {};
                    //console.log("Anado usuario");
                 }   
             });
    }

      //////////////////////////////////////////////////////////Notificaciones funciones
      $scope.successSubscription = async function(){

        //Las llaves se generan una vez por proyecto, intentar no mover que no sé desuscribir
        const PUBLIC_VAPID_KEY = "BAJsV1r7TlO6xgRYruDPqcZaXg1k0kY56bVnymq4uUg9Gsf7XS6qYYjtisRDcFhhJWBmBVJd9fkOnDGjSrqpgFM";
        //funcion para construccion del mensaje
        function urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
        }



        /////////////////////////////Inicio de la funcion de suscripcion persé
            // Service Worker
            console.log("Registering a Service worker");
            const register = await navigator.serviceWorker.register("/worker.js", {
            scope: "/"
            });
            console.log("New Service Worker");

            // Listener de Push Notifications
            console.log("Listening Push Notifications");
            const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
            });

            console.log(subscription);

            // Maanda la subscripcion 
            await fetch("/subscription", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
                "Content-Type": "application/json"
            }
            });
            console.log("Subscribed!");

            await fetch('/new-message', {
            method: 'POST',
            body: JSON.stringify({message: 'Inicio correcto', title:'Notificaciones Activas' }),
            headers: {
                'Content-Type': 'application/json'
            }
            });
            //console.log('Si llego jsjs'); Monitoreo de consola si llega la subs

            
        // Detectamos errores
        //if ("serviceWorker" in navigator) {
       //     subscription().catch(err => console.log(err));
      //  }

     }

    $scope.showNotification = async function(){
       // $window.location.href = '/grupos'; nos regresa a una referencia anterior
        //const form = document.querySelector('#myform'); resetea la forma donde está puesta en html
        const message = document.querySelector('#message');//Importante que se llame igual esta variable en el jade y aqui
       // const form2 = document.querySelector('#myformT'); resetea la forma donde está puesta html
        const title = document.querySelector('#title');//Importante que se llame igual esta variable en el jade y aqui
        await fetch('/new-message', {
            method: 'POST',
            //body: JSON.stringify({message: 'Funcion en botón', title:'YesYesYes' }),//Mensaje forzado
            body: JSON.stringify({message: message.value, title:title.value }),//Mensaje adquirido
            headers: {
              'Content-Type': 'application/json'
            }
          });
          //console.log('Si llego jsjs'); Mostrar en consola si llega
          
        // Detectamos errores
        if ("serviceWorker" in navigator) {
            subscription().catch(err => console.log(err));
        }
        
    }

    $scope.unSuscribe = async function(){
        navigator.serviceWorker.ready.then(function(reg) {
            reg.pushManager.getSubscription().then(function(subscription) {
              subscription.unsubscribe().then(function(successful) {
                // You've successfully unsubscribed
              }).catch(function(e) {
                // Unsubscribing failed
              })
            })
          });
          console.log("Desuscrito");
     }
///////////////////////////////////////////////////Fin de funciones de notificaciones
      
    });  
})();