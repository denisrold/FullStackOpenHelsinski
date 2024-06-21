import { Form,Button } from "react-bootstrap";
import { useField } from "../src/hooks";
import { useNavigate } from "react-router-dom";
const Login = ({setUser}) =>{
    const username = useField('text');
    const navigate = useNavigate();
    const onSubmit = (e) =>{
        e.preventDefault();
        setUser(username.value);
        navigate('/')
    }
    return(
    <div>
      <h2>login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            {...username}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
    )
}

export default Login;