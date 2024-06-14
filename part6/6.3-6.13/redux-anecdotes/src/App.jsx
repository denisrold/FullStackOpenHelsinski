import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import { useEffect } from 'react';
import anecdoteService from './service/anecdotes';
import { useDispatch } from 'react-redux';
import { createAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    anecdoteService.getAll().then(res => res.forEach(anecdote => dispatch(createAnecdote(anecdote))))
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