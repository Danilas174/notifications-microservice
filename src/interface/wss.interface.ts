import WebSocket from 'ws';
export interface IConnection {
  users: Map<number, IUser>;
  events: Map<string, IUserMap>;
}

export interface IUser {
  ws: WebSocket;
  events: Set<string>;
}

export interface IUserMap {
  [user_id: number]: {
    ws: WebSocket;
  };
}

export interface ISubscribeMessage {
  type: string;
  user_id: number;
  event_name: string;
}
