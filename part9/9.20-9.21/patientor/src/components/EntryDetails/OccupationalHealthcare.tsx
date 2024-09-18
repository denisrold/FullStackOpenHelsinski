import { Entry } from "../../types";
import { IconButton } from "@mui/material";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

export const OccupationalHealthcare: React.FC<{ entry : Entry }> = ({entry})=>{
  if (entry.type === 'OccupationalHealthcare'){
    return (
      <article>
        <div className="typeIcon">
        <IconButton>
          <MedicalInformationIcon/>
        </IconButton>
        <p>Employer: {entry.employerName}</p>
        </div>
        {entry.sickLeave?<p>SickLeave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</p>:
        null
        }
      </article>
    )
  }
  else {
    return null;
  }
}