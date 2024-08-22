import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from '../../service/querys';

const Books = ({show}) => {
  if (!show) {
    return <div style={{ display: 'none' }} />
  }

  const {data,loading,error} = useQuery(ALL_BOOKS);

  if(loading){
    return (<>
    loading...
    </>)
  }

  const books = [...data.allBooks]

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a,i) => (
              <tr key={i}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>)
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
