import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import NewContact from './components/NewContact';
import NumberList from './components/NumberList';
import services from  './services/phoneBook.js';

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [filterPersons,setNewFilterPerson]= useState([])
  const [newFilter, setNewFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const   handleAxios= async () => {
  const personsArray = await services.getAll()
  .then(contacts => {return contacts}).catch(err=>console.log(err))
    setPersons([...personsArray]);
  }

  useEffect(()=>{
    if(!persons.length)handleAxios();
  }
  ,[]);
 

  const handleSubmit = (event)=>{
    event.preventDefault();
    let updateCotanct = false;
    //UPDATE CONTACT
    const existingPerson = persons.find(person => newName.toLowerCase() === person.name.toLowerCase());
    if(existingPerson){
      alert( newName + " is already added to phonebook");
      const confirm = window.confirm("do you wanna change Number?");
      
      if(confirm){
          let id = existingPerson.id;
          const editContact = {
            name: newName,
            number:newNumber,
            id
          }

        services.update(id,editContact)
        .then(updatedPerson =>{
          setPersons(persons.map(person => person.id !== id ? person : updatedPerson))})
        .catch(err=>{console.log(err)})
        updateCotanct = true;
      }
      else{return updateCotanct=true }
    };
    
    //CREATE CONTACT
    if(!updateCotanct){
      const contactID = Math.random().toString();
      const newContact = {
        name:newName,
        number:newNumber,
        id:contactID
      }
  
      services.create(newContact)
      .then(newPerson => setPersons([...persons,newPerson]))
      .catch(error => console.log(error));
    }

    setNewFilter('');
    setNewName('');
    setNewNumber('');
  }

  useEffect(()=>{
    const filter = persons.filter((person) => { 
      return person.name.toLowerCase().includes(newFilter) || person.number.includes(newFilter)
    }
   );
    setNewFilterPerson(filter);
  },[newFilter])
  
  const handleDelete = (id)=>{
    services.deleteContact(id).catch(err=>console.log(err));
    setPersons((persons.filter(contact => contact.id != id)));
    setNewFilterPerson((persons.filter(contact => contact.id != id)));
  }

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
      <NumberList newFilter={newFilter} filterPersons={filterPersons} persons={persons} deleteContact={handleDelete}/>
    </div>
  )
}

export default App