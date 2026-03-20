import express from 'express';
import { getAllTickets, appendTicket } from '../utils/ticketStore';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rows = await getAllTickets();
    res.json(rows);
  } catch (error) {
    console.error('Failed to fetch tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Received POST /api/tickets request');
    const { id, date, email, title, category, urgency, description } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await appendTicket([id, date, email, title, category, urgency, description, 'Aberto', '', '']);
    res.status(201).json({ success: true });
  } catch (error: any) {
    console.error('Failed to create ticket:', error.message);
    res.status(500).json({ error: 'Failed to create ticket', details: error.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const rows = await getAllTickets();
    const data = rows.slice(1);

    if (data.length === 0) {
      return res.json({
        total: 0, open: 0, inProgress: 0, resolved: 0,
        weeklyData: Array(7).fill({ name: '', count: 0 }),
        statusDistribution: [],
      });
    }

    const open = data.filter(r => r[7] === 'Aberto').length;
    const inProgress = data.filter(r => r[7] === 'Em Andamento').length;
    const resolved = data.filter(r => r[7] === 'Resolvido').length;

    res.json({
      total: data.length,
      open,
      inProgress,
      resolved,
      weeklyData: [
        { name: 'Seg', count: 0 }, { name: 'Ter', count: 0 }, { name: 'Qua', count: 0 },
        { name: 'Qui', count: 0 }, { name: 'Sex', count: 0 }, { name: 'Sáb', count: 0 }, { name: 'Dom', count: 0 },
      ],
      statusDistribution: [
        { name: 'Abertos', value: open },
        { name: 'Em Andamento', value: inProgress },
        { name: 'Resolvidos', value: resolved },
      ],
    });
  } catch (error: any) {
    console.error('CRITICAL ERROR in /stats:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
