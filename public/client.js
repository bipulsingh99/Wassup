// const Socket = require("socket.io");

var Socket = io();
let Name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");
do {
  Name = prompt("enter your name");
} while (!Name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(mssg) {
  let msg = {
    user: Name,
    message: mssg.trim(),
  };

  // append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  // send to server
  Socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markUp = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markUp;
  messageArea.appendChild(mainDiv);
}

//receive message

Socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
