import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import { IconButton } from "@mui/material";
import { useEffect } from 'react';

interface ErrorComponentProps {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({error,setError}) => {
  useEffect(()=>{
    const setTimeError = () => {
      setTimeout(() => {
        setError(null);
      }, 5000); 
    };
     setTimeError()
  },[setError])

    return(
    <>
      {error?(<div className="ErrorForm">
        {error}
        <IconButton>
          <PriorityHighRoundedIcon style={{fontSize:'medium'}} color='warning'/>
        </IconButton>
      </div>):null} 
    </>)
}

export default ErrorComponent;