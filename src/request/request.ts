import express from 'express';
import { sendMessage } from './send-message';

const postHandler = express.Router();

// Обработчик POST запросов
postHandler.post('/notify', (req, res) => {
  sendMessage(req, res);
});

export default postHandler;
