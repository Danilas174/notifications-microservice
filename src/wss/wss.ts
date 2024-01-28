import { Server } from 'http';
import WebSocket from 'ws';
import {
  IConnection,
  ISubscribeMessage,
  IUser,
  IUserMap,
} from '../interface/wss.interface';
import CheckProtocol from '../checking/protocol';

//Текущие соединения
export const connections: IConnection = {
  users: new Map<number, IUser>(),
  events: new Map<string, IUserMap>(),
};

//Запуск сервера
function startWSS(server: Server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws: WebSocket) => {
    //Проверяем доступ по токену
    const access = CheckProtocol(ws.protocol);
    if (!access) {
      ws.close(1008, 'Invalid token');
      return;
    }

    ws.on('message', (message: Buffer) => {
      try {
        const data: ISubscribeMessage = JSON.parse(message.toString());

        if (data.type) {
          subscribe(data.user_id, data.event_name, ws);
        } else {
          unsubscribe(data.user_id, data.event_name);
        }
        console.log(connections.users);
      } catch (error) {
        console.error('Ошибка при обработке сообщения:', error);
      }
    });

    ws.on('close', () => {
      ws.close();
      console.log('Соединение закрыто');
    });
  });
}

//Подписка на событие
function subscribe(user_id: number, event_name: string, ws: WebSocket) {
  const user = connections.users.get(user_id);

  if (user) {
    user.events.add(event_name);
  } else {
    connections.users.set(user_id, {
      ws,
      events: new Set([event_name]),
    });
  }
}

//Отписка от события
function unsubscribe(user_id: number, event_name: string) {
  const user = connections.users.get(user_id);

  if (user) {
    user.events.delete(event_name);
    if (user.events.size === 0) {
      close(user_id);
    }
  }
}

//Закрытие соединения
function close(user_id: number) {
  const user = connections.users.get(user_id);

  if (user && user.events.size === 0) {
    user.ws.close();
    connections.users.delete(user_id);
  }
}

export default startWSS;
