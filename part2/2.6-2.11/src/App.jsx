import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import NewContact from './components/NewContact';
import NumberList from './components/NumberList';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]); 


  const   handleAxios= async () => {
  const personsArray =await  axios.get('http://localhost:3001/persons')
    .then(response => {return response.data});
    setPersons([...personsArray]);
  }

  useEffect(()=>{
    if(!persons.length)handleAxios();
  }
  ,[]);
 

  const [filterPersons,setNewFilterPerson]= useState([])
  const [newFilter, setNewFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleSubmit = (event)=>{
    event.preventDefault();
    if(persons.find(person=>newName === person.name)){return alert( newName + " is already added to phonebook")};
    const newObject = {
      name:newName,
      number:newNumber,
      id:persons.length+1
    }
    setPersons([...persons,newObject]);
    setNewFilter('');
    setNewName('');
    setNewNumber('');
  }

  useEffect(()=>{
    const filter = persons.filter((person) => { return person.name.toLowerCase().includes(newFilter) || person.number.includes(newFilter)});
    setNewFilterPerson(filter);
  },[newFilter])
  
  const handleFilter = (event)=>{
    setNewFilter(event.target.value);
  }

  const handleNameChange =(event)=>{
    setNewName(event.target.value)
  }
  const handleNumberChange =(event)=>{
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilter={handleFilter}/> 
      <NewContact handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <NumberList newFilter={newFilter} filterPersons={filterPersons} persons={persons} />
    </div>
  )
}

export default App