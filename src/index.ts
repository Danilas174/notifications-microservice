import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const port = process.env.PORT || 9008;

wss.on('connection', (ws: WebSocket) => {
  console.log(`Пользователь подключен`);
  console.log(ws);
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
