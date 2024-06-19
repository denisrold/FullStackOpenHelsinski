import { useParams } from "react-router-dom"
const AnecdoteById = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(a => a.id=== Number(id))
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