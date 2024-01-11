// server.js
import express from 'express';
import http from 'http';
import startWSS from './wss';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const server = http.createServer(app);
const port = process.env.PORT;

// Запуск WebSocket сервера
startWSS(server);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
