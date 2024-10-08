import express from 'express';
import getPatientService from '../services/patientServices';
import toNewPatientEntry from '../utils';
import patientServices from '../services/patientServices';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = getPatientService.getNonSensitiveEntries();
  res.send(result);
})
router.get('/:id', (_req, res) => {
  const { id }= _req.params
  // const result = getPatientService.getPatientById(id);
  res.send( getPatientService.getPatientById(id) );
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

router.post('/:id/entries',async (req,res) => {
  const { id } = req.params;
  try {
    const updatedPatient = patientServices.postEntryById(id, req.body);
    res.status(200).json(updatedPatient); 
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    }
  }
})
export default router;
