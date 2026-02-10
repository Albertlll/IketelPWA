import { io, Socket } from "socket.io-client";

// const SOCKET_URL = "ws://localhost:8000";
// const SOCKET_URL = "wss://iketel.ru";
type EventCallback = (...args: any[]) => void;

class SocketService {
	private static instance : SocketService;
  private socket: Socket | null = null;
	
	public static getInstance() {
		if (!SocketService.instance) {
			SocketService.instance = new SocketService();
		}
		return SocketService.instance
	}

	public connect() : Promise<string> {
    if (!this.socket) {
      console.log("Попытка подрубиться к сокету")
			const socketUrl = import.meta.env.VITE_SOCKET_URL;
			const socketPathValue = import.meta.env.VITE_SOCKET_PATH || "/sio";
			const socketPath = socketPathValue.startsWith("/")
				? socketPathValue
				: `/${socketPathValue}`;

      this.socket =io(socketUrl || window.location.origin, {
				path: socketPath,
				autoConnect: false,
				withCredentials: true,
				transports: ["websocket"],
			});

    }
    return new Promise((resolve, reject) => {
    

      this.socket?.once("connect", () => {resolve("Подключено")})
      this.socket?.once("connect_error", (error) => {reject(error)})

      this.socket?.connect();
    })






	}

	public on(event: string, callback: EventCallback): void {
    this.socket?.on(event, callback);
  }

  public off(event: string, callback?: EventCallback): void {
    if (callback) {
      this.socket?.off(event, callback);
    } else {
      this.socket?.off(event);
    }
  }

  public emit(event: string, data?: any): void {
    this.socket?.emit(event, data);
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public isConnected(): boolean {
    return this.socket?.connected || false;
  }
}



export default SocketService;
