import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../querys';
const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const {data,loading,error} = useQuery(ALL_AUTHORS) 
  if(loading){
    return <>
    loading...
    </>
  }
  const authors = [...data.allAuthors]

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors