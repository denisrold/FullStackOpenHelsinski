import { useEffect } from 'react';
import './App.css';
import { sensitivityDiaryes } from './types';
import { useState } from 'react';
import { getAllDiaries } from './services/flightServices';
import DiariesList from './components/DiariesList/DiariesList';
import AddForm from './components/AddForm/AddForm';

function App() {
  const [diaries, setDiaries] = useState<sensitivityDiaryes[]>([]);
  useEffect(()=>{
    getAllDiaries().then(res=>setDiaries(res));
  },[])

  return (
    <>
      <AddForm />
      <DiariesList diaries={diaries}/>
    </>
  )
}

export default App
