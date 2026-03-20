import { prisma } from '../config/prismaClient';
import type { Ticket } from '../generated/prisma/client';

const HEADER = ['ID', 'Data', 'Email', 'Título', 'Categoria', 'Urgência', 'Descrição', 'Status', '', ''];

const toRow = (t: Ticket) =>
  [t.id, t.date, t.email, t.title, t.category, t.urgency, t.description, t.status, '', ''];

export const appendTicket = async (values: any[]) => {
  const [id, date, email, title, category, urgency, description, status] = values;
  await prisma.ticket.create({ data: { id: String(id), date, email, title, category, urgency, description, status } });
};

export const getAllTickets = async (): Promise<any[][]> => {
  const tickets = await prisma.ticket.findMany({ orderBy: { createdAt: 'asc' } });
  return [HEADER, ...tickets.map(toRow)];
};
