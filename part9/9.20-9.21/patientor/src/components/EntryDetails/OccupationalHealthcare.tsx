import { Entry } from "../../types";

export const OccupationalHealthcare: React.FC<{ entry : Entry }> = ({entry})=>{
  if (entry.type === 'OccupationalHealthcare'){
    return (
      <article>
        <p>Employer: {entry.employerName}</p>
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