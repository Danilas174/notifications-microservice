import express from 'express';
import http from 'http';
import startWSS from './wss/wss';
import postHandler from './request/request';
import { PORT } from './config/config';

const app = express();
const server = http.createServer(app);

// Добавляем middleware для парсинга JSON
app.use(express.json());

// Подключаем обработчик POST запросов
app.use(postHandler);

// Запуск WebSocket сервера
startWSS(server);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
