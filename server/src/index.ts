import express from 'express';
import cors from 'cors';
import ticketsRouter from './routes/tickets';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/tickets', ticketsRouter);

export default app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
