import express from 'express';
import { getRows, appendRow } from '../utils/sheetUtils';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rows = await getRows('Tickets!A:J');
    res.json(rows);
  } catch (error) {
    console.error('Failed to fetch tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Received POST /api/tickets request');
    console.log('Body:', JSON.stringify(req.body));
    
    const { id, date, email, title, category, urgency, description } = req.body;
    
    if (!title || !category || !description) {
      console.error('Missing required fields in request body');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await appendRow('Tickets!A:J', [id, date, email, title, category, urgency, description, 'Aberto', '', '']);
    console.log('Successfully added ticket to sheet');
    res.status(201).json({ success: true });
  } catch (error: any) {
    console.error('Failed to create ticket:', error.message);
    if (error.response) console.error('Google API Response:', error.response.data);
    res.status(500).json({ error: 'Failed to create ticket', details: error.message });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const rows = await getRows('Tickets!A:J');
    if (!rows) return res.json({ total: 0, open: 0, inProgress: 0, resolved: 0, weeklyData: [], statusDistribution: [] });

    const data = rows.slice(1); // Remove header
    const stats = {
      total: data.length,
      open: data.filter(r => r[7] === 'Aberto').length,
      inProgress: data.filter(r => r[7] === 'Em Andamento').length,
      resolved: data.filter(r => r[7] === 'Resolvido').length,
      // Simplified weekly data (mocked for now, but structure is ready)
      weeklyData: [
        { name: 'Seg', count: 12 }, { name: 'Ter', count: 18 }, { name: 'Qua', count: 25 },
        { name: 'Qui', count: 14 }, { name: 'Sex', count: 20 }, { name: 'Sáb', count: 5 }, { name: 'Dom', count: 3 }
      ],
      statusDistribution: [
        { name: 'Abertos', value: 0 },
        { name: 'Em Andamento', value: 0 },
        { name: 'Resolvidos', value: 0 }
      ]
    };
    
    stats.statusDistribution[0].value = stats.open;
    stats.statusDistribution[1].value = stats.inProgress;
    stats.statusDistribution[2].value = stats.resolved;

    res.json(stats);
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
