import { useEffect, useState } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import Menu from '../components/Menu';
import AnecdoteById from '../components/AnecodoteById';
import AnecdoteList from '../components/AnecdoteList';
import About from '../components/About';
import Footer from '../components/Footer';
import CreateNew from '../components/CreateNew';
import Notification from '../components/Notification';


const App = () => {
  const [notification, setNotification] = useState('')
  const [newNotification,setNewNotification] = useState(false);

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

//UseMatch for use Params ID
const match = useMatch("/anecdotes/:id");
const anecdote = match
? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
: null
  console.log(notification)
  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        
        <Routes>
        <Route path="/" element={(
          <>
            <Notification  notification={notification} newNotification={newNotification} setNewNotification={setNewNotification} setNotification={setNotification}/>
            <AnecdoteList anecdotes={anecdotes} />
          </>
            )}/>
        <Route path="/anecdotes/:id" element={<AnecdoteById anecdote={anecdote} />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/create" element={<CreateNew anecdotes={anecdotes}  setNewNotification={setNewNotification} setNotification={setNotification} setAnecdote={setAnecdotes} />}/>
        </Routes>
        <Footer />
      </div>
  )
}

export default App
