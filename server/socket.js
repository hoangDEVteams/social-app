const WebSocket = require('ws');

function initWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', function connection(ws) {
    console.log('New client connected');

    ws.on('message', function incoming(message) {
      console.log('received:', message);

      // Gửi lại cho tất cả client
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message.toString());
        }
      });
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
}

module.exports = initWebSocket;