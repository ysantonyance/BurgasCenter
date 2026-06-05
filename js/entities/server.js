import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// get institutions
app.get('/institutions', async (req, res) => {
  const result = await db.query('SELECT * FROM institutions');
  res.json(result.rows);
});

// add complaint
app.post('/complaints', async (req, res) => {
  const { title, description } = req.body;

  const result = await db.query(
    'INSERT INTO complaints (title, description) VALUES ($1, $2) RETURNING *',
    [title, description]
  );

  res.json(result.rows[0]);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
