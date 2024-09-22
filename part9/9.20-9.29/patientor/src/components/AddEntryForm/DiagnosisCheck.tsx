import { DiagnosisCheckProps } from "../../types";

const DiagnosisCheck : React.FC<DiagnosisCheckProps> = ({ diagnosis, setNewEntry, newEntry }) => { 
  
  const handleOnChange = (e : React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
      if(target.checked){   
        setNewEntry({...newEntry, diagnosisCodes:[...(newEntry.diagnosisCodes || []),target.value] })
      }
      else{
        setNewEntry({
          ...newEntry,
          diagnosisCodes: newEntry.diagnosisCodes?.filter(code => code !== target.value)
        });
      }
    }  

  return(
    <div className="inputsContainer checkbox">
      {diagnosis?.map((d,i)=>(
      <label key={i} htmlFor="diagnosisCodes">
        {d.code}
        <input onChange={handleOnChange} name='diagnosisCodes' type="checkbox" value={d.code}/>
      </label>)
    )}
    </div>
  )

}

export default DiagnosisCheck;