import app from '../server/src/index';

// No Vercel, o Express às vezes precisa saber que a rota /api 
// é a raiz da função serverless
export default app;
