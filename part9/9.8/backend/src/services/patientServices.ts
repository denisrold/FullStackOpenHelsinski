import  { Patient , NonSensitivePatient } from '../types'
import patients from '../../data/patients';
 
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

export default {
  getPatients,
  getNonSensitiveEntries
};
