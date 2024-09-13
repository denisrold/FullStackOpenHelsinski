import  { Patient , NonSensitivePatient, NewPatientEntry } from '../types'
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

const getPatientById = (id:string) : Patient | boolean => {
  const patient = patients.find(patient => patient.id === id);
  if(patient){
    return patient
  }
  return false;
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
  getPatientById
};
