import * as WebSocket from "ws";
import { newGame } from "./game";
import { MongoClient } from 'mongodb';

export default class ClientControl {
  private static sockets: WebSocket[] = [];
  private ws: WebSocket;
  private mongoClient: MongoClient
  
  constructor(ws: WebSocket, mongoClient: MongoClient) {
    this.ws = ws;
    this.mongoClient = mongoClient
  }

  handleConnection() {
    // new connection - send welcome message (?)
    // add client to mongodb-receiving clients.
    this.ws.send(JSON.stringify({ok: true}));
    ClientControl.sockets.push(this.ws);
  }

  close() {
    const idx = ClientControl.sockets.indexOf(this.ws)
    if (idx >= 0) {
      ClientControl.sockets.splice(idx, 1);
    }
  }  

  public async handleMessage(socket: WebSocket, data) {
    const handles = {
      new_game: newGame
    }
    if (!data.type) {
      console.error('type not set of message.');
      return
    }
    const func = handles[data.type];
    await func(socket, data, this.mongoClient, this);
  }

}