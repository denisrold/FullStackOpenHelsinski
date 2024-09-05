import express from 'express';
import getPatientService from '../services/patientServices';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = getPatientService.getNonSensitiveEntries();
  res.send(result);
})


export default router;
