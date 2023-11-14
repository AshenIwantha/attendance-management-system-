const { Server: WebSocketServer } = require('ws');

const initWebSocketServer = (server) => {
//   return new Promise((resolve) => {
 const wss = new WebSocketServer({ server, path: '/socket' });

  


//     wss.on('connection', (ws) => {
//         // ws.on('message', (data) => {
//           // Handle incoming messages from clients if needed
//         // });

//         console.log("first")
  
//         // ws.send('kio0000033');
//       });


//     return(wss);
//   });
};

module.exports = initWebSocketServer;
