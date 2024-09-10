import express from 'express';

import getPatientService from '../services/patientServices';
import toNewPatientEntry from '../utils';
import patientServices from '../services/patientServices';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = getPatientService.getNonSensitiveEntries();
  res.send(result);
})


router.post('/', (_req, res) => {
  try{
    const newPatinentEntry = toNewPatientEntry(_req.body);
    const addedPatient = patientServices.addPatient(newPatinentEntry);
    res.json(addedPatient);
  }
 catch(err:unknown){
  let error:string = "something was wrong: " 
  if(err instanceof Error){
    error + err.message;
  }
  res.status(400).json({error: error});
 }
})

export default router;
