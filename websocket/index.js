const WebSocket = require('ws');

module.exports = function (server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (client) => {
    client.on('message', (stringData) => {
      const data = JSON.parse(stringData);

      if (data.target)
      {
        wss.clients.forEach(socket => {
          if (socket.uuid === data.target) {
            socket.send(stringData);
          }
        });
      }
      else {
        switch (data.type) {
          case 'online':
            client.uuid = data.id;
          case 'online-ACK':
          case 'decline':
            wss.clients.forEach(socket => {
              if (client !== socket) {
                socket.send(stringData);
              }
            });
            break;
        }
      }
    });

    client.on('close', () => {
      delete wss.clients[client];

      wss.clients.forEach(socket => {
        if (client !== socket) {
          socket.send(JSON.stringify({type: 'offline', id: client.uuid}));
        }
      });
    });
  })
}