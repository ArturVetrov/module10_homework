const input = document.querySelector("#message-text");
const btnPush = document.querySelector("#button-push");
const btnGeo = document.querySelector('#button-geoloc');
const msgScreen = document.querySelector("#messages-screen");
const chatMsg = document.querySelector(".chat-messages");

const wsUri = "wss://echo-ws-service.herokuapp.com/";
let websocket;
websocket = new WebSocket(wsUri);

btnPush.addEventListener('click', () => {
  event.preventDefault();
  let msg = input.value;
  msgScreen.innerHTML += `<div class="user-msg-div"><p class="new-msg" id="message">User: ${msg}</p></div>`;
  input.value = '';
  websocket.send(msg);
  websocket.onmessage = function(evt) {
    msgScreen.innerHTML += `<div class="server-msg-div"><p class="new-msg" id="message">Server: ${msg}</p></div>`;
  };
});

const error = () => {
  alert('Невозможно получить ваше местоположение');
}

const success = (position) => {
  msgScreen.innerHTML += `<div class="server-msg-div"><a class="new-msg href" href='https://www.openstreetmap.org/#map=18/${position.coords.latitude}/${position.coords.longitude}'>Ваша гео-позиция</a></div>`;
  let notif = document.getElementById('notif');
  notif.remove();
}

btnGeo.addEventListener('click', () => {
  event.preventDefault();
  if (!navigator.geolocation) {
    alert('Geolocation не поддерживается вашим браузером');
  } else {
    msgScreen.innerHTML += `<div class="server-msg-div" id="notif"><p class="new-msg" id="message">Server: Определение местоположения!</p></div>`;
    navigator.geolocation.getCurrentPosition(success, error);
  }
});


