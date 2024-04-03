const NumberList = ({newFilter,filterPersons,persons,deleteContact})=>{
   
    const ContactList = ({personData})=>{
        return(
            <div key={personData.id}>
            <p >{personData.name} : {personData.number}</p>
            <button id={personData.id} onClick={handleDelete}>Delete</button>
            </div>
        )
    }
    
    const handleDelete = (event)=>{
        const confirmacion = window.confirm('¿are you shure?');

        if (confirmacion) {
        deleteContact(event.target.id);
        }
    }
    return (
        <>
        <h2>Numbers</h2>
       { !persons.length?<h3>Loading...</h3>:
       newFilter? filterPersons.map((person)=><ContactList key={person.id} personData={person}/> ) 
        : 
        persons.map((person)=><ContactList key={person.id} personData={person}/> )}
       
        </>
    );
}

export default NumberList;