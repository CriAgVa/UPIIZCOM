const PUBLIC_VAPID_KEY = "BAJsV1r7TlO6xgRYruDPqcZaXg1k0kY56bVnymq4uUg9Gsf7XS6qYYjtisRDcFhhJWBmBVJd9fkOnDGjSrqpgFM";

const subscription = async () => {
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
    body: JSON.stringify({message: 'Prueba de suscripcion', title:'Entraste uwu' }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

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

// De la interfaz manda el mensaje
const form = document.querySelector('#myform');
const message = document.querySelector('#message');
const form2 = document.querySelector('#myformT');
const titulo = document.querySelector('#title');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch('/new-message', {
    method: 'POST',
    body: JSON.stringify({message: message.value, title:title.value }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  form.reset();
  form2.reset();
});

// Detectamos errores
if ("serviceWorker" in navigator) {
  subscription().catch(err => console.log(err));
}
