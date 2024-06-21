import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const Persons = ({persons}) => {
    return(
      <TableContainer component={Paper}>
      <Table>
        <TableBody>
      {persons.map(n =>(
          <TableRow key={n.id}>
          <TableCell>
          {n.name}
          </TableCell>
          <TableCell>
            {n.number}
          </TableCell>
          </TableRow >
         ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}
export default Persons;