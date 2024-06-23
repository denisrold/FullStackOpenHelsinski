import { Form,Button } from "react-bootstrap";
import { useField } from "../src/hooks";

const FormNotes = ({noteService}) => {
    const content = useField('text')
    const handleNoteSubmit = (event) => {
        event.preventDefault()
        noteService.create({ content: content.value })
      }
    return(
    <>
      <Form onSubmit={handleNoteSubmit}>
      <Form.Group>
        <Form.Control {...content} />
      </Form.Group>
        <Button variant="primary" type="submit">create</Button>
      </Form>
    </>)
}
export default FormNotes;