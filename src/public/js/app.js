const socket = new WebSocket(`ws://${window.location.host}`);
// 여기 front에서 backend로 메세지를 보낼 수 있다.

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

function handleOpen() {
  console.log("Connected to Server");
}
socket.addEventListener("open", handleOpen);

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server X");
});

// //front->back 메시지 보내기
// setTimeout(() => {
//   socket.send("hello from the browser!");
// }, 10000);

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}
messageForm.addEventListener("submit", handleSubmit);
