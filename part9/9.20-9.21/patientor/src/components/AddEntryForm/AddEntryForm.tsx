import { Diagnosis, EntryWithoutId, patientId } from "../../types";
import { Button } from "@mui/material";
import './AddEntryForm.css';
import { useState } from "react";
import DiagnosisCheck from "./DiagnosisCheck";
import SelectType from "./SelectType";
import patientService from "../../services/patients";
import axios from "axios";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import AddDateForm from "./AddDateForm";

export const AddEntryForm : React.FC<{ patientId : patientId, onClose:()=>void,diagnosis: Diagnosis[] | undefined  }> = ({ patientId , onClose,diagnosis }) => {
  const [error,setError] = useState<string|null>(null);
  const [ newEntry,setNewEntry ] = useState<EntryWithoutId>(
    {
      description: '',
      date: '',
      specialist: '',
      diagnosisCodes: [],
      type: "HealthCheck",
      healthCheckRating:0,
    });
  
  const handleOnChange = (e : React.FormEvent<HTMLInputElement >) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;;
      setNewEntry({...newEntry, [target.name]:target.value})
   }  

   const handleSubmit = async(e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      const response = await patientService.addEntries(patientId,newEntry)
      console.log('actualizar desde aca',response)
      onClose();
    }
    catch(err:unknown){
      if(err instanceof Error){
        if (axios.isAxiosError(err) && err.response){
          setError(err.response?.data?.error)
        }
        throw new Error(err.message)
      }
    }
  }
 
return(
  <>
    <ErrorComponent error={error} setError={setError}/>
    <form className="formEntry" onSubmit={handleSubmit}>
      <div className="inputsContainer">
        <SelectType newEntry={ newEntry }  setNewEntry={ setNewEntry } />
      </div>
      <AddDateForm handleOnChange={handleOnChange} />
      <div className="inputsContainer">
        <label htmlFor="specialist">
          specialist:
        </label>
          <input onChange={handleOnChange} name='specialist' type="text" />
      </div>
      <div className="inputsContainer">
        <label htmlFor="HealthCheckRating">
        Health Check Rating:
        </label>
        <input onChange={handleOnChange} name='healthCheckRating' type="number" min={0} max={3} 
        title="Healthy = 0 | LowRisk = 1 | HighRisk = 2 | CriticalRisk = 3"/>
      </div>
      <div className="inputsContainer"> 
        <label htmlFor="description">
          description:
        </label>
        <input onChange={handleOnChange} name='description' type="text" />
      </div>
        Diagnosis Codes:
        <DiagnosisCheck diagnosis={diagnosis} newEntry={newEntry} setNewEntry={setNewEntry}/>
      <Button className='buttonEntry' variant="contained" type="submit" > Add </Button>
    </form>
    </>
  )
}

export default AddEntryForm;