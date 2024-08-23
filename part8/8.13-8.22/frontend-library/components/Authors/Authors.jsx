import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../../service/querys';
import SetBorn from '../setBorn/setBorn';

const Authors = ({show,token}) => {
  if (!show) {
    return null
  }
  const {data,loading,error} = useQuery(ALL_AUTHORS) 
  if(loading){
    return (
    <>
      loading...
    </>)
  }
  const authors = [...data.allAuthors]

  return (<>
  
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
      {token && <SetBorn authors={authors}/>}
    </div>
    </>
  )
}

export default Authors
