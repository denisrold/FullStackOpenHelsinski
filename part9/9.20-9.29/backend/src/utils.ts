import { Entry, Gender , NewPatientEntry,Diagnose } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};
const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing SSN');
  }
  return ssn;
};
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing weather: ' + gender);
  }
  return gender; 
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};


const toNewPatientEntry = (object: unknown): NewPatientEntry  => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('occupation' in object && 'dateOfBirth' in object && 'ssn' in object && 'name' in object && 'gender' in object && 'entries' in object) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
      ssn: parseSSN(object.ssn),
      dateOfBirth: parseDate(object.dateOfBirth),
      entries: Array.isArray(object.entries) ? object.entries as Entry[] : []
    };
    return newEntry;
  }
  
  throw new Error('Incorrect data: some fields are missing');
};

export const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose['code']>;
  }
  return object.diagnosisCodes as Array<Diagnose['code']>;
};

export default toNewPatientEntry;
