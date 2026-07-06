import type { WsEvent } from "@/src/types/websocket";

type MessageHandler = (event: WsEvent) => void;


class WebSocketManager {
  private ws: WebSocket | null = null;

  private reconnectAttempts = 0;

  private readonly maxReconnect = 5;

  private readonly baseDelay = 1000;

  private heartbeat: ReturnType<typeof setInterval> | null = null;

  private messageQueue: string[] = [];

  private handler: MessageHandler | null = null;

  connect(handler: MessageHandler) {
    this.handler = handler;

    this.ws = new WebSocket(
      process.env.NEXT_PUBLIC_WS_URL!
    );

    this.ws.onopen = () => {
      console.log("WS Connected");

      this.reconnectAttempts = 0;

      this.flushQueue();

      this.startHeartbeat();
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      this.handler?.(data);
    };

    this.ws.onclose = () => {
      console.log("Disconnected");

      this.stopHeartbeat();

      this.retry();
    };

    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  send(message: object) {
    const payload = JSON.stringify(message);

    if (
      this.ws &&
      this.ws.readyState === WebSocket.OPEN
    ) {
      this.ws.send(payload);
    } else {
      this.messageQueue.push(payload);
    }
  }

  disconnect() {
    this.stopHeartbeat();

    this.ws?.close();
  }

  private retry() {
    if (
      this.reconnectAttempts >=
      this.maxReconnect
    )
      return;

    const delay =
      this.baseDelay *
      Math.pow(2, this.reconnectAttempts);

    setTimeout(() => {
      this.reconnectAttempts++;

      this.connect(this.handler!);
    }, delay);
  }

  private startHeartbeat() {
    this.heartbeat = setInterval(() => {
      this.send({
        type: "ping",
      });
    }, 30000);
  }

  private stopHeartbeat() {
    if (this.heartbeat) {
      clearInterval(this.heartbeat);

      this.heartbeat = null;
    }
  }

  private flushQueue() {
    while (this.messageQueue.length) {
      const message =
        this.messageQueue.shift();

      if (
        message &&
        this.ws?.readyState ===
          WebSocket.OPEN
      ) {
        this.ws.send(message);
      }
    }
  }
    constructor() {
  if (typeof window !== "undefined") {
    window.addEventListener(
      "online",
      () => {
        this.connect(this.handler!);
      }
    );

    window.addEventListener(
      "offline",
      () => {
        console.log(
          "Internet Offline"
        );
      }
    );
  }
}
}

export default new WebSocketManager();