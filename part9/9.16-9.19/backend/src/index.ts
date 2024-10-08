import express from 'express';
import diaryRouter from './routes/diaries';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/diaries' , diaryRouter);
const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
