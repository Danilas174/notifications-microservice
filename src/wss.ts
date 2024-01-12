// websocketServer.js
import { Server } from 'http';
import WebSocket from 'ws';
import {
  IConnection,
  ISubscribeMessage,
  IUser,
  IUserMap,
} from './interface/wss.interface';

//Текущие соединения
const connections: IConnection = {
  users: new Map<number, IUser>(),
  events: new Map<string, IUserMap>(),
};

//Запуск сервера
function startWSS(server: Server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log(`Пользователь подключен`);

    ws.on('message', (message: ISubscribeMessage) => {
      try {
        const data: ISubscribeMessage = message;

        if (data.type === 'subscribe') {
          subscribe(data.user_id, data.event_name);
        }
      } catch (error) {
        console.error('Ошибка при обработке сообщения:', error);
      }
    });

    // Обработка закрытия соединения
    ws.on('close', () => {
      console.log('Соединение закрыто');
    });
  });
}

function subscribe(user_id: number, event_name: string) {
  const user = connections.users.get(user_id);

  if (user) {
    // Добавляем пользователя к событию
    const eventUsers = connections.events.get(event_name) || {};
    eventUsers[user_id] = {
      connection_id: user.connection_id,
    };
    connections.events.set(event_name, eventUsers);

    // Добавляем событие к пользователю
    user.events.push(event_name);

    console.log(`Пользователь ${user_id} подписан на событие ${event_name}`);
  } else {
    console.error(`Пользователь с ID ${user_id} не найден`);
  }
}

export default startWSS;
