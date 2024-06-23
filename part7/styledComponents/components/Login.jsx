
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'

const Login = ({setUser}) =>{

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`
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
          username:
          <Input />
        </div>
        <div>
          password:
          <Input type='password' />
        </div>
        <Button type="submit" primary=''>login</Button>
      </form>
    </div>
  )
}

export default Login;