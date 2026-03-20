import { redis } from '../config/redisClient';

const HEADER = ['ID', 'Data', 'Email', 'Título', 'Categoria', 'Urgência', 'Descrição', 'Status', '', ''];

export const appendTicket = async (values: any[]) => {
  const [id, date, email, title, category, urgency, description, status, col9, col10] = values;
  const ticket = { id, date, email, title, category, urgency, description, status, col9, col10 };
  await redis.set(`ticket:${id}`, JSON.stringify(ticket));
  await redis.zadd('tickets:index', Date.now(), String(id));
};

export const getAllTickets = async (): Promise<any[][]> => {
  const ids = await redis.zrange('tickets:index', 0, -1);
  if (ids.length === 0) return [HEADER];

  const pipeline = redis.pipeline();
  ids.forEach(id => pipeline.get(`ticket:${id}`));
  const results = await pipeline.exec();

  const rows = results!.map(([, val]) => {
    const t = JSON.parse(val as string);
    return [t.id, t.date, t.email, t.title, t.category, t.urgency, t.description, t.status, t.col9, t.col10];
  });

  return [HEADER, ...rows];
};
