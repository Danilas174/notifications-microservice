import express from 'express';
import http from 'http';
import startWSS from './wss/wss';
import { PORT } from './config/config';

const app = express();
const server = http.createServer(app);

// Запуск WebSocket сервера
startWSS(server);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
