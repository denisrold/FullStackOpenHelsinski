import axios from "axios";
import { Diagnosis, Patient, PatientFormValues, patientId } from "../types";

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

export default {
  getAll, create, getById , getDiagnoses
};

