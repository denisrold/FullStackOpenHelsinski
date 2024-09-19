import  { Patient , NonSensitivePatient, NewPatientEntry, Entry } from '../types'
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { parseDiagnosisCodes } from '../utils';
const getPatients = () : Patient[] => {
 return patients;
};
 
const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({  id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
  }));
 };

const getPatientById = (id:string) : Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  if(patient){
    return patient;
  }
  return undefined;
}

const postEntryById = (id:string, entry : Entry) : Patient | undefined => {
  
  const patient = getPatientById(id);
  if(patient){
    if (entry.type === 'Hospital' && !entry.discharge ){
      throw new Error('Type Hospital must includes discharge.')
    }
    if (entry.type === 'OccupationalHealthcare' && !entry.employerName ){
      throw new Error('Type OccupationalHealthcare must includes employer name.')
    }
    if (entry.type === 'HealthCheck' && !entry.healthCheckRating ){
      throw new Error('Type HealthCheck must includes healthCheckRating.')
    }
    const entryId = uuid();
    const parseDiagnosisEntry = parseDiagnosisCodes(entry)
    const newEntry = {...entry, id:entryId, diagnosisCodes:parseDiagnosisEntry};
    patient.entries = [...(patient.entries || []) , newEntry]
    return patient
  }
  
  return undefined;
}

const addPatient = ( entry: NewPatientEntry ): Patient => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitiveEntries,
  addPatient,
  getPatientById,
  postEntryById
};
