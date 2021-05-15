import ClientControl from './ClientControl';
import { initExpress, initWebSocket } from './web';
import { initMongo } from './mongo_con'

// Web server / express setup
const {app, server} = initExpress();
const wsServer = initWebSocket(server);

const mongoClient = initMongo()


wsServer.on('connection', function (socket) {
  const control = new ClientControl(socket, mongoClient);
  socket.on('message', function (msg) {
    const data = JSON.parse(msg.toLocaleString());
    void async function() {
      await control.handleMessage(socket, data)
    }().catch((err) => {
      console.error(err.message);
      socket.send(JSON.stringify({ id: msg.id, error: err.message }));
    }
    );
  });
  socket.on('close', () => {
    // remove RobotControl from sockets
    control.close();
  });
});
