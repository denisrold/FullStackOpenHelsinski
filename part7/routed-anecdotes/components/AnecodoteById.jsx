
const AnecdoteById = ({ anecdote }) => {
    return (
      <div>
        Este es una anecdota
        <p>
          {anecdote.content}
        </p>
      </div>
      )
    }
export default AnecdoteById;