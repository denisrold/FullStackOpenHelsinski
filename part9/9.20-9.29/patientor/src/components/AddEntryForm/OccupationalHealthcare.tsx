import { EntryWithoutId } from "../../types";
import AddDateForm from "./AddDateForm";


export interface OccupationalHealth {
  newEntry:  EntryWithoutId;
  setNewEntry:  (entry: EntryWithoutId) => void;
}

const OccupationalHealthcare:React.FC<OccupationalHealth> = ({ newEntry,setNewEntry }) => { 
  const handleOnChange = (e : React.FormEvent<HTMLInputElement >) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    if(newEntry.type === 'OccupationalHealthcare' && ( target.name === 'startDate'||target.name === 'endDate')){
      setNewEntry({...newEntry, sickLeave: {...newEntry.sickLeave, [target.name]:target.value}})
    }
    else{
      setNewEntry({...newEntry, [target.name]:target.value})
    }  
    
      
   }  

  return(
      <>
        <h4>Ocupational healthcare</h4>
        <div className="OccupationalHealthcareContainer">
          Sick leave:
          <AddDateForm objectName={'startDate'} name={'start date'} required={false} handleOnChange={handleOnChange} />
          <AddDateForm objectName={'endDate'} name={'end date'} required={false} handleOnChange={handleOnChange} />
          <div className="inputsContainer"> 
            <label htmlFor="criteria">
            employerName:
          </label>
            <input required onChange={handleOnChange} name='employerName' type="text" maxLength={25} />
          </div>
        </div>
      </>
  )
}
export default OccupationalHealthcare;