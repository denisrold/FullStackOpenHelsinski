import { IconButton } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from "@mui/material/colors";
import { HealthCheckRating } from "../../types";

export const HealtCheckRating : React.FC<{rate : HealthCheckRating}> = ({rate}  ) => {
  /*
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3 */
  switch (rate) {
    case HealthCheckRating.Healthy:
     return ( 
      <div>
        <span>Status: Healthy</span>
        <IconButton>
          <FavoriteIcon color='success'/>
        </IconButton>
      </div>
      )
    case HealthCheckRating.LowRisk:
      return (
        <div>
          <span>Status: Low Risk</span>
          <IconButton>
            <FavoriteIcon color='secondary'/>
          </IconButton>
        </div>
      ) 
    case HealthCheckRating.HighRisk:
      return (
        <div>
          <span>
          Status: High Risk
          </span>
        <IconButton>
          <FavoriteIcon color='disabled'/>
        </IconButton>
        </div>
      )
    case HealthCheckRating.CriticalRisk:
    return (
      <div>
        <span>
        Status: Critical Risk
        </span>
      <IconButton>
        <FavoriteIcon sx={{ color: red[700] }}/>
      </IconButton>
      </div>
    )
    default:
      undefined;
  }
}