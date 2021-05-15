class WebSocketCon {
  private ws: WebSocket;

  constructor() {
    const protocol = window.location.href.startsWith('https') ? 'wss' : 'ws';
    const hostname = window.location.hostname;
    let backendURI = `${protocol}://${hostname}`
    console.log(process.env);
    let port = window.location.port;
    if (port === '3000') {
      port = '4000';
    }
    if (port !== '') {
      backendURI += `:${port}`
    }
    this.ws = new WebSocket(backendURI);
    this.ws.onmessage = (ev) => {
      // handle incoming message.
      this.handleData(JSON.parse(ev.data));
    }
    console.log(this.ws);
  }

  send(data: string) {
    this.ws.send(data);
  }

  handleData(data: object) {
    console.log('received', data)
  }
}

export { WebSocketCon }