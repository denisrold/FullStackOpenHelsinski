import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import NewContact from './components/NewContact';
import NumberList from './components/NumberList';
import services from  './services/phoneBook.js';
import { Message, messageNotification} from './components/Message.jsx';


const App = () => {
  const [persons, setPersons] = useState([]); 
  const [filterPersons,setNewFilterPerson]= useState([])
  const [newFilter, setNewFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage,setErrorMessage] = useState(false);

  //SERVER DATA GET
  const   handleAxios= async () => {
  const personsArray = await services.getAll()
  .then(contacts => {return contacts}).catch(err=>console.log(err))
    setPersons([...personsArray]);
  }

  //USEEFFECTS!
  useEffect(()=>{
    if(!persons.length)handleAxios();
  }
  ,[]);
 
  useEffect(()=>{
    setTimeout(()=>{
      setErrorMessage(false);
    },5000)
},[errorMessage])

useEffect(()=>{
  const filter = persons.filter((person) => { 
    return person.name.toLowerCase().includes(newFilter.toLowerCase()) || person.number.includes(newFilter)
  }
 );
  setNewFilterPerson(filter);
},[newFilter])


//HANDLERS
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
          messageNotification(setMessage,updatedPerson.name, 'updated' );
          setPersons(persons.map(person => person.id !== id ? person : updatedPerson))})
        .catch(err=>{
          setErrorMessage(true);
          messageNotification(setMessage,newName,'deleted already from the server. Error.');
        })
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
      .then(newPerson => {
        messageNotification(setMessage,newPerson.name, 'created' );
        setPersons([...persons,newPerson])})
      .catch(error => console.log(error));
    }

    setNewFilter('');
    setNewName('');
    setNewNumber('');
  }


  
  const handleDelete = (id)=>{
    services.deleteContact(id).catch(err=>console.log(err));
    setPersons((persons.filter(contact => contact.id != id)));
    messageNotification(setMessage,persons.filter(contact => contact.id == id)[0].name, "deleted");
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
      <Message message={message} errorMessage={errorMessage} />
      <Filter newFilter={newFilter} handleFilter={handleFilter}/> 
      <NewContact handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newNumber={newNumber} />
      <NumberList newFilter={newFilter} filterPersons={filterPersons} persons={persons} deleteContact={handleDelete}/>
    </div>
  )
}

export default App