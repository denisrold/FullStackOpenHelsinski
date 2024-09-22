import { useEffect, useState } from "react";
import { Diagnosis, patientId } from "../../types";
import { useParams } from "react-router-dom";
import patientService from '../../services/patients'
import './OnePatientView.css'; 
import EntriesBase from "../EntryDetails/EntriesBase";



const OnePatientView = () => {
  const [patient, setPatient] = useState<patientId>();
  const [updatePatient, setupdatePatient] = useState<boolean>(false);
  const [diagnosis,setDiagnosis] = useState<Diagnosis[]>()
  const { id } = useParams()

  const fetchPatientList = async () => {
    if(id){
      const patientById = await patientService.getById(id);
      if(patientById)
        setPatient(patientById);
    };
  }

  const fetchDiagnosis = async () => {
      const diagnosisList = await patientService.getDiagnoses();
      if(diagnosisList)
        setDiagnosis(diagnosisList);
  }

  useEffect(() => {
    void fetchPatientList();
    if(!diagnosis?.length){
      void fetchDiagnosis();
    }
    setupdatePatient(false);
  }, [updatePatient]);

if(!patient){
  <h3>Loading...</h3>
}

else{
 return ( 
      <> 
      <article className="NameById">
        <h2>{patient.name}</h2>
      {patient.gender === 'male'?
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"  style={{width:'1.5rem'}}><path d="M372 64h-79c-10.7 0-16 12.9-8.5 20.5l16.9 16.9-80.7 80.7c-22.2-14-48.5-22.1-76.7-22.1C64.5 160 0 224.5 0 304s64.5 144 144 144 144-64.5 144-144c0-28.2-8.1-54.5-22.1-76.7l80.7-80.7 16.9 16.9c7.6 7.6 20.5 2.2 20.5-8.5V76c0-6.6-5.4-12-12-12zM144 384c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"/></svg>
      :
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 512" style={{width:'1.5rem'}}><path d="M288 176c0-79.5-64.5-144-144-144S0 96.5 0 176c0 68.5 47.9 125.9 112 140.4V368H76c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h36v36c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-36h36c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-36v-51.6c64.1-14.5 112-71.9 112-140.4zm-224 0c0-44.1 35.9-80 80-80s80 35.9 80 80-35.9 80-80 80-80-35.9-80-80z"/></svg>
      }
      </article>
        <h4>ssh: {patient.ssn}</h4>
        <h4>occupation: {patient.occupation}</h4>
        <EntriesBase patient={patient} diagnosis={diagnosis} setUpdatePatient={setupdatePatient}/> 
      </>)
      }
}
export default OnePatientView;