
import { Entry } from "../../types"
import { IconButton } from "@mui/material";
import { HealtCheckRating } from "./HealthCheckRating.tsx";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

export const HealthCheck: React.FC<{ entry : Entry }> = ({entry}) => {
    
  if (entry.type === 'HealthCheck'){
  return (
      <article className="healtcheckrating">
        <div className="typeIcon">
        <IconButton>
          <HealthAndSafetyIcon/>
        </IconButton>
        HealtCheck Rating: 
        </div>
        <HealtCheckRating rate={entry.healthCheckRating}/>
      </article>)
  }
  else{
    return null;
  }
}