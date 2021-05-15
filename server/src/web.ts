// websocket and http/express connection config
import * as ws from 'ws';
import * as http from 'http';
import express from 'express';
import path from 'path';
import * as fs from 'fs';

const BASE_PATH = fs.existsSync('/app') ? '/app' : path.join(__dirname, "..", "..");
const STATIC_PATH = path.join(BASE_PATH, "client", "build");

function initExpress() {
  const port = Number(process.env.PORT || 4000) + 
  Number(process.env.NODE_APP_INSTANCE || 0);

  const app = express();
  app.use(express.json());

  console.log(`[server] public path: ${STATIC_PATH}`)
  app.use('/', express.static(STATIC_PATH));

  app.get('/', (req, res) => {
    res.sendFile(path.join(STATIC_PATH, 'index.html'));
  });

  const server = app.listen(port, () => {
    console.log(`[server] Server is running on port: ${port}`);
  });

  return {app, server};
}

function initWebSocket(server: http.Server) {
  // we resue the express-server to upgrade the connection for the WebSocket
  const wsServer = new ws.Server({ noServer: true });

  server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
      wsServer.emit('connection', socket, request);
    });
  });
  return wsServer;
}

export {initExpress, initWebSocket}