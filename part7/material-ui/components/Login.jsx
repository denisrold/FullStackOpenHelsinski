import { TextField,Button } from  '@mui/material'
import { useField } from "../src/hooks";
import { useNavigate } from "react-router-dom";
const Login = ({setUser}) =>{
    const username = useField('text');
    const navigate = useNavigate();
    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(e.target[0].value);
        setUser(e.target[0].value);
        navigate('/')
    }
    return(
      <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <TextField label="username" />
        </div>
        <div>
          <TextField label="password" type='password' />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
    )
}

export default Login;