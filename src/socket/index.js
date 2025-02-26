var WebSocket = require("ws");
var socketInstance;
const initializeSocket = async () => {
  // socket connection
  socketInstance = new WebSocket.Server({ port: 5004 });
  socketInstance &&
    console.log("web socket listening on port ", socketInstance.address().port);

  socketInstance.on("connection", (ws) => {
    console.log("Client connected");
    ws.on("message", (message) => {
      console.log("received: %s", message);
    });
  });
  return socketInstance ? true : false;
};

module.exports = {
  initializeSocket,
};
