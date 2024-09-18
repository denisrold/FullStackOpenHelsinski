
import { IconButton } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Entry } from "../../types"

export const Hospital: React.FC<{ entry : Entry }> = ({entry}) =>{
  if (entry.type === 'Hospital' ){
    return (
      <article>
        <div className="typeIcon">
        <IconButton>
          <LocalHospitalIcon/>
        </IconButton>
        <p>date: {entry.discharge.date} - {entry.discharge.criteria}</p> 
        </div>
      </article>
    )
  }
  else{ return null;}
}