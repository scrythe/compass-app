export interface ServerToClientEvents {
  transcript: (data: string) => void;
}

export interface ClientToServerEvents {
  packetSent: (data: Blob) => void;
}

export interface InterServerEvents {}

export interface SocketData {}
