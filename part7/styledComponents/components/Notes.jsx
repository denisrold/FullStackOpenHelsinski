import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'
import { Link } from 'react-router-dom';

const Notes = ({notes}) => {
    return(
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
          {notes.map(note =>
            <TableRow key={note.id}>
            <TableCell>
            <Link to={`/notes/${note.id}`}>
              {note.content}
            </Link>
            </TableCell>
            <TableCell>
              {note.user}
            </TableCell>
            </TableRow >
          )}
          </TableBody>
        </Table>
      </TableContainer>
      )
      }
export default Notes;