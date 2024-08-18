import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ADD_BOOKS, ALL_BOOKS } from '../querys'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook]  = useMutation(ADD_BOOKS,
    {
      refetchQueries: [ { query: ALL_BOOKS } ]
    ,
      onError: (error) => {
        // Manejo de errores de GraphQL
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          const graphQLError = error.graphQLErrors[0];
          const message = graphQLError.message || 'Error desconocido.';
          console.log(message);
        } else if (error.networkError) {
          console.log('Error de red ocurrió.');
        } else {
          console.log('Error desconocido.');
        }
      },
    }

    
  );

    if (!props.show) {
      return null
    }

  const submit = async (event) => {
    event.preventDefault()
    createBook({variables: {title,author,published:Number(published),genres}})
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook