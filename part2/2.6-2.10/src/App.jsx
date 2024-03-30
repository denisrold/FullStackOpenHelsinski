import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import NewContact from './components/NewContact';
import NumberList from './components/NumberList';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

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