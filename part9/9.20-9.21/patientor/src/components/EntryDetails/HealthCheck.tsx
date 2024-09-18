
import { Entry } from "../../types"
import { HealtCheckRating } from "./HealthCheckRating.tsx";


export const HealthCheck: React.FC<{ entry : Entry }> = ({entry}) => {
    
  if (entry.type === 'HealthCheck'){
  return (
  /**
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
  */
      <article className="healtcheckrating">
        HealtCheck Rating: 
        <HealtCheckRating rate={entry.healthCheckRating}/>
      </article>)
  }
  else{
    return null;
  }
}