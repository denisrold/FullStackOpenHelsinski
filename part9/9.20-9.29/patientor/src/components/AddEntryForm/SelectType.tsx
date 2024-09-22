import { EntryWithoutId } from "../../types";

interface SelectTypeProps {
  newEntry: EntryWithoutId;
  setNewEntry: (entry: EntryWithoutId) => void;
}
const SelectType: React.FC<SelectTypeProps> = ({ newEntry, setNewEntry }) => {
  const handleOnSelect = (e : React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    let newObjectBySelect  = {}

    if (target.value === 'OccupationalHealthcare') {
      newObjectBySelect = { 
        description: '',
        date: '',
        type: target.value,
        specialist: '',
        diagnosisCodes: [],
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
      };
    } 

    else if (target.value === 'Hospital'){ 
      newObjectBySelect = {
        description: '',
        date: '',
        type: target.value,
        specialist: '',
        diagnosisCodes: [],
        discharge: {
          date: '',
          criteria: '',
        },
      };
    }
    else if (target.value === 'HealthCheck'){ 
      newObjectBySelect = {
        description: '',
        date: '',
        type: target.value,
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: 0,
      };
    }  
    else { setNewEntry(newEntry) }
    setNewEntry(newObjectBySelect as EntryWithoutId)
  }
  return (
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
  );
};


export default SelectType