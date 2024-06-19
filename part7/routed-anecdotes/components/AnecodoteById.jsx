
const AnecdoteById = ({ anecdote }) => {

    return (
      <div>
        <h1>{anecdote.content}</h1>
        <p>Author: {anecdote.author}</p>
        <p>has {anecdote.votes} votes</p>
        <p>
          for more info see <a target="_blank noopener norel" href={anecdote.info}>{anecdote.info}</a> 
        </p>
      </div>
      )
    }
export default AnecdoteById;