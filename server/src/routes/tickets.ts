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
    const { id, date, email, title, category, urgency, description } = req.body;
    await appendRow('Tickets!A:J', [id, date, email, title, category, urgency, description, 'Aberto', '', '']);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Failed to create ticket:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

export default router;
