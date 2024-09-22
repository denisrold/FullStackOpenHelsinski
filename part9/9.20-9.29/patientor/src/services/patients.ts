import axios from "axios";
import { Diagnosis, Entry, EntryWithoutId, Patient, PatientFormValues, patientId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id : string) => {
  const { data } = await axios.get<patientId>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};
const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getDiagnoses = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

const addEntries = async (patient: patientId ,newEntry:EntryWithoutId )=>{
  try{
    const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${patient.id}/entries`, newEntry)
    return data
  }
  catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('esteError',error.response.data);
    } else {
      console.error('Unexpected error', error);
    }
    throw error; 
  }
}

export default {
  getAll, create, getById , getDiagnoses , addEntries
};

