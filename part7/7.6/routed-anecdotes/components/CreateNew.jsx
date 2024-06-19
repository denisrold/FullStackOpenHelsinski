

import { useNavigate } from "react-router-dom"
import { useNotificationDispatch } from "../src/NotificationContext";
import  { useField } from '../hook/hooks'

const CreateNew = (props) => {
  const navigate = useNavigate();
  const content = useField('text');
  const author = useField('text')
  const info = useField('text')
  
    const dispatch = useNotificationDispatch()

    const addNew = (anecdote) => {
      anecdote.id = Math.round(Math.random() * 10000)
      props.setAnecdote(props.anecdotes.concat(anecdote))
      dispatch({type:'ADD',payload:'A new anecdote: '+ anecdote.content + ' has been created'})
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content:content.value,
        author:author.value,
        info:info.value,
        votes: 0
      })
      navigate('/')
    }
    const handleReset = (e) => {
      e.preventDefault();
      content.onClick(e.target.value,true);
      author.onClick(e.target.value,true);
      info.onClick(e.target.value,true);
    }
    return (
      
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content} />
          </div>
          <div>
            author
            <input {...author} />
          </div>
          <div>
            url for more info
            <input {...info} />
          </div>
          <button>create</button>
          <button onClick={(e)=>handleReset(e)}>reset</button>
        </form>
      </div>
    )
  
  }

  export default CreateNew;