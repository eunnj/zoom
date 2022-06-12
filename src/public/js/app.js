const socket = new WebSocket(`ws://${window.location.host}`);
// 여기 front에서 backend로 메세지를 보낼 수 있다.

function handleOpen() {
  console.log("Connected to Server");
}
socket.addEventListener("open", handleOpen);

socket.addEventListener("message", (message) => {
  console.log("Just got this: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server X");
});

//front->back 메시지 보내기
setTimeout(() => {
  socket.send("hello from the browser!");
}, 10000);
