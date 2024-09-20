import { Diagnosis, EntryWithoutId, patientId } from "../../types";
import { Button } from "@mui/material";
import './AddEntryForm.css';
import { useState } from "react";
import DiagnosisCheck from "./DiagnosisCheck";

export const AddEntryForm : React.FC<{ patientId : patientId, onClose:()=>void,diagnosis: Diagnosis[] | undefined  }> = ({ patientId , onClose,diagnosis }) => {
  
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
 
   const handleOnSelect = (e : React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;;
      setNewEntry({...newEntry, [target.name]:target.value})
   }  

   const handleSubmit = (e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    onClose();
    console.log('funciono',patientId)
  }

  const dateToday = () => {
  const today :string = new Date().toISOString().split('T')[0];
  return today
}
return(
<form className="formEntry" onSubmit={handleSubmit}>
<div className="inputsContainer">
   <label htmlFor="type">
      type:
    </label>
    <select name='type' value={newEntry.type} onChange={handleOnSelect}>
      <option value="HealthCheck">HealthCheck</option>
      <option value="Hospital">Hospital</option>
      <option value="OccupationalHealthcare">OccupationalHealthcare</option>
    </select>
  </div>
  <div className="inputsContainer">
   <label htmlFor="date">
      date:
    </label>
     <input onChange={handleOnChange} name='date' type="date" max={dateToday()} />
  </div>
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
</form>)
}

export default AddEntryForm;