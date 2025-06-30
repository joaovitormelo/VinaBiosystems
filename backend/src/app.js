import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

import router from './routes.js'
app.use(router);

app.listen(8000, ()=>console.log("API running"));

app.use((err, req, res, next) => {
  console.error(err.stack); // Loga o erro
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});