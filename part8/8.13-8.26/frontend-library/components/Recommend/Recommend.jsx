import { useState } from "react";
import { useQuery } from "@apollo/client"
import { RECOMMEND } from '../../service/querys';

const Recommend = ({show}) => {
  if (!show) {
    return <div style={{ display: 'none' }} />
  }

  const [selectedGenre, setSelectedGenre] = useState(null);

  const {data,loading,error} = useQuery(RECOMMEND, {
    variables: { genre: selectedGenre }});

  if(loading){
    return (<>
    loading...
    </>)
  }

  const books = [...data.allBooks]
  let filteredBooks = [...books] 
  return (
    <div>
      <h2>Recommendations</h2>
     <div>Books in your favourite genre: {data.me.favoriteGenre}</div>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          { filteredBooks.map((a,i) => (
            a.genres.includes(data.me.favoriteGenre)?(
              <tr key={i}>
                <td> {a.title}</td>
                <td> {a.author.name}</td>
                <td> {a.published}</td>
              </tr>
            )
            :
            null
          )
          )}

        </tbody>
      </table>
    </div>
  )
}

export default Recommend;
