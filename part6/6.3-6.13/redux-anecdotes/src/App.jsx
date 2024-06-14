import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import { useEffect } from 'react';
import { initializeAnecdotes } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';


const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(initializeAnecdotes())
  },[])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <Notification/>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App