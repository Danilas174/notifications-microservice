// websocketServer.js
import { Server } from 'http';
import WebSocket from 'ws';
import { IConnection, IUser, IUserMap } from './interface/wss.interface';

function startWSS(server: Server) {
  const wss = new WebSocket.Server({ server });

  const connections: IConnection = {
    users: new Map<number, IUser>(),
    events: new Map<string, IUserMap>(),
  };

  wss.on('connection', (ws) => {
    console.log(`Пользователь подключен`);

    ws.on('message', (message) => {
      console.log(`Получено сообщение: ${message}`);
      // Отправляем сообщение обратно клиенту
      ws.send(`Вы сказали: ${message}`);
    });

    // Обработка закрытия соединения
    ws.on('close', () => {
      console.log('Соединение закрыто');
    });
  });
}

export default startWSS;
