import { connections } from '../wss/wss';
import { Request, Response } from 'express';

export function sendMessage(req: Request, res: Response): void {
  const { user_id, event_name, message } = req.body;
  const user = connections.users.get(user_id);

  if (!user) {
    res.status(404).send('User connection not found');
  }

  // Проверяем, есть ли указанное событие в списке событий пользователя
  if (!user?.events.has(event_name)) {
    res.status(404).send('Event not found');
  }

  user?.ws.send(JSON.stringify({ event: event_name, message }));
  res.send('Message sent successfully');
}
