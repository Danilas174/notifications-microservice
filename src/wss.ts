// websocketServer.js
import { Server } from 'http';
import WebSocket from 'ws';

function startWSS(server: Server) {
  const wss = new WebSocket.Server({ server });

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
