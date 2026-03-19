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
    console.log('GET /api/tickets/stats - Fetching data from Google Sheets');
    const rows = await getRows('Tickets!A:J');
    
    if (!rows || rows.length === 0) {
      console.log('No data found in Tickets sheet');
      return res.json({ 
        total: 0, open: 0, inProgress: 0, resolved: 0, 
        weeklyData: Array(7).fill({ name: '', count: 0 }), 
        statusDistribution: [] 
      });
    }

    const data = rows.slice(1); // Remove header
    const stats = {
      total: data.length,
      open: data.filter(r => r[7] === 'Aberto').length,
      inProgress: data.filter(r => r[7] === 'Em Andamento').length,
      resolved: data.filter(r => r[7] === 'Resolvido').length,
      weeklyData: [
        { name: 'Seg', count: 0 }, { name: 'Ter', count: 0 }, { name: 'Qua', count: 0 },
        { name: 'Qui', count: 0 }, { name: 'Sex', count: 0 }, { name: 'Sáb', count: 0 }, { name: 'Dom', count: 0 }
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

    console.log('Stats calculated successfully:', stats.total, 'tickets found');
    res.json(stats);
  } catch (error: any) {
    console.error('CRITICAL ERROR in /stats:', error.message);
    const statusCode = error.response?.status || 500;
    const errorMsg = statusCode === 403 ? 'Erro de Permissão: O e-mail da conta de serviço não tem acesso de Editor na planilha.' : 
                     statusCode === 404 ? 'Erro: A aba "Tickets" não foi encontrada na planilha.' : 
                     error.message;
    
    res.status(statusCode).json({ error: errorMsg });
  }
});

export default router;
