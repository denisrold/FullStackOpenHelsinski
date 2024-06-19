

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useNotificationDispatch } from "../src/NotificationContext";

const CreateNew = (props) => {
  const navigate = useNavigate();
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')
    const dispatch = useNotificationDispatch()
    const addNew = (anecdote) => {
      anecdote.id = Math.round(Math.random() * 10000)
      props.setAnecdote(props.anecdotes.concat(anecdote))
      props.setNotification(anecdote.content + ' has been created');
      dispatch({type:'ADD',payload:anecdote.content + ' has been created'})
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content,
        author,
        info,
        votes: 0
      })
      navigate('/')
    }
  
    return (
      
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div>
            author
            <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <div>
            url for more info
            <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
          </div>
          <button>create</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew;