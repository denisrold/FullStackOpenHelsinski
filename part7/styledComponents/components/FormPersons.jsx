import { useField } from "../src/hooks";
import { Table, Form, Button } from 'react-bootstrap'

const FormPersons = ({personService}) => {
    const name = useField('text')
    const number = useField('number')
    const handlePersonSubmit = (event) => {
        event.preventDefault()
        personService.create({ name: name.value, number: number.value})
      }
    return(<>
      <Form onSubmit={handlePersonSubmit}>
        <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control
        {...name} /> <br/>
        <Form.Label> number:</Form.Label>
        <Form.Control
        {...number} />
        </Form.Group>
        <Button  variant="primary" type="submit">create</Button>
      </Form>
    </>)
}
export default FormPersons;