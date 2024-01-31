import { connections } from '../wss/wss';
import express from 'express';

const postHandler = express.Router();

// Обработчик POST запросов
postHandler.post('/notify', (req, res) => {
  const { user_id, event_name, message } = req.body;

  // Проверяем, существует ли подключение для данного пользователя
  const userConnection = connections.users.get(user_id);

  if (userConnection) {
    //Отправляем сообщение пользователю
    userConnection.ws.send(JSON.stringify({ event: event_name, message }));
    res.send('Message sent successfully');
  } else {
    res.status(404).send('User connection not found');
  }
});

export default postHandler;
