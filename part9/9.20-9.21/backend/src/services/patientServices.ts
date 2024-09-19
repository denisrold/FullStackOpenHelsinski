import  { Patient , NonSensitivePatient, NewPatientEntry, Entry } from '../types'
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
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
    return patient
  }
  return undefined;
}

const postEntryById = (id:string, entry : Entry) : Patient | undefined => {
  
  const patient = getPatientById(id);
  if(patient){
    const entryId = uuid();
    const newEntry = {...entry, id:entryId};
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
