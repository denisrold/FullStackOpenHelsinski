import express from 'express';
import getDiagnosesService from '../services/diagnosisServise';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = getDiagnosesService.getDiagnoses();
  res.send(result);
})


export default router;
