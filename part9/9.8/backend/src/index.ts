import express from 'express';
import cors from "cors";
import diagnoses from './routes/diagnoses'
import patients from './routes/patients';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/diagnoses', diagnoses);
app.use('/api/patients', patients);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.json({ping:'pong'});
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
