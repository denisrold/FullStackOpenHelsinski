import { useState } from "react";
import { useQuery } from "@apollo/client"
import { ALL_BOOKS} from '../../service/querys';

const Books = ({show}) => {
  if (!show) {
    return <div style={{ display: 'none' }} />
  }
  const [selectedGenre, setSelectedGenre] = useState(null);

  const {data,loading,error} = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
    fetchPolicy: 'cache-and-network'
  });

  if(loading){
    return (<>
    loading...
    </>)
  }

  const books = [...data.allBooks]
  const genres = [...new Set([].concat(...books.map(book => book.genres)))];
  let filteredBooks = [...books] 


  const handleFilter =(e)=>{
    setSelectedGenre(e.target.value === 'all' ? null : e.target.value);
  }
  return (
    <div>
      <h2>books</h2>
      {selectedGenre&& <div>In genre {selectedGenre}</div>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          { filteredBooks.map((a,i) => (
            <tr key={i}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )
          )}

        </tbody>
      </table>
      {genres && genres.map((g,i)=>(
      <button onClick={handleFilter} key={i} value={g}>{g}</button>     
      ))}
      <button onClick={handleFilter} value={'all'}>all</button>
    </div>
  )
}

export default Books
