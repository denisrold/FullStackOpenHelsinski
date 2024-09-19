import { patientId } from "../../types";
import { Button } from "@mui/material";
import './AddEntryForm.css';

export const AddEntryForm : React.FC<{ patientId : patientId, onClose:()=>void }> = ({ patientId , onClose }) => {
  const handleSubmit = (e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    onClose();
    console.log('funciono',patientId)
  }

return(
<form className="formEntry" onSubmit={handleSubmit}>
  <div className="inputsContainer">
   <label htmlFor="date">
      date:
    </label>
     <input name='date' type="text" />
  </div>
  <div className="inputsContainer">
    <label htmlFor="specialist">
      specialist:
    </label>
      <input name='specialist' type="text" />
  </div>
  <div className="inputsContainer"> 
    <label htmlFor="description">
      description:
   </label>
    <input name='description' type="text" />
  </div>
  <div className="inputsContainer">
   <label htmlFor="diagnosisCodes">
     diagnosis codes:
    </label>
    <input name='diagnosisCodes' type="text" />
  </div>
<Button className='buttonEntry' variant="contained" type="submit" > Add </Button>
</form>)
}

export default AddEntryForm;