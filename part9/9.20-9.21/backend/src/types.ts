
export enum Gender { 
  Male="male",
  Female="female",
  Other="other" 
};

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
};

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: EntryWithoutId[]
};

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries' >;
export type NewPatientEntry = Omit<Patient, 'id'  >;


export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string,
  sickLeave?: SickLeave
}

export interface discharge {
  date: string,
  criteria: string,
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: discharge
}


export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

  
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;