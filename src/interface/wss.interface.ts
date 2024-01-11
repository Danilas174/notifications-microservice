export interface IConnection {
  users: Map<number, IUser>;
  events: Map<string, IUserMap>;
}

export interface IUser {
  connection_id: number;
  events: string[];
}

export interface IUserMap {
  [user_id: number]: {
    connection_id: number;
  };
}