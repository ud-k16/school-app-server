var WebSocket = require("ws");
var socketInstance = new WebSocket.WebSocketServer({ port: 5004 });

socketInstance &&
  console.log("web socket listening on port ", socketInstance.address().port);

socketInstance.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("message", (message) => {
    console.log("received: %s", message);
  });
});

module.exports = {
  socketInstance,
};
