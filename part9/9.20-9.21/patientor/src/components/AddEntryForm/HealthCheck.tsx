import { EntryWithoutId } from "../../types";
export interface HealthCheckInterface {
  newEntry:  EntryWithoutId;
  setNewEntry:  (entry: EntryWithoutId) => void;
}

const HealthCheck:React.FC<HealthCheckInterface> = ({ newEntry,setNewEntry }) => {

  const handleOnChange = (e : React.FormEvent<HTMLInputElement >) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
      setNewEntry({...newEntry, [target.name]:target.value})
   }  

  return (
    <div className="inputsContainer">
        <label htmlFor="HealthCheckRating">
        Health Check Rating:
        </label>
        <input  required onChange={handleOnChange} name='healthCheckRating' type="number" min={0} max={3} 
        title="Healthy = 0 | LowRisk = 1 | HighRisk = 2 | CriticalRisk = 3"/>
    </div>
  )

}

export default HealthCheck;