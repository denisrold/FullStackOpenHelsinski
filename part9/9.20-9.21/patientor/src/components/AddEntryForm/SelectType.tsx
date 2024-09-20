import { EntryWithoutId } from "../../types";

interface SelectTypeProps {
  newEntry: EntryWithoutId;
  setNewEntry: (entry: EntryWithoutId) => void;
}
const SelectType: React.FC<SelectTypeProps> = ({ newEntry, setNewEntry }) => {
  const handleOnSelect = (e : React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;;
      setNewEntry({...newEntry, [target.name]:target.value})
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