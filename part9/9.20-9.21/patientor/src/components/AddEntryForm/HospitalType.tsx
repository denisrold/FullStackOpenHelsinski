import { EntryWithoutId } from "../../types";
import AddDateForm from "./AddDateForm";


export interface OccupationalHealth {
  newEntry:  EntryWithoutId;
  setNewEntry:  (entry: EntryWithoutId) => void;
}

const HospitalType:React.FC<OccupationalHealth> = ({ newEntry,setNewEntry }) => {

  const handleOnChange = (e : React.FormEvent<HTMLInputElement >) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
      setNewEntry({...newEntry, [target.name]:target.value})
   }  

  return (
    <>
    <h4>DISCHARGE: </h4>
    <div className="dischargeContainer">
      <AddDateForm objectName={'dischargeDate'} name={'discharge date'} handleOnChange={handleOnChange} required={true}/>
      <div className="inputsContainer"> 
        <label htmlFor="criteria">
        criteria:
      </label>
        <input required onChange={handleOnChange} name='criteria' type="text" />
      </div>
    </div>
    </>
  )

}

export default HospitalType;