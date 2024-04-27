const NumberList = ({newFilter,filterPersons,persons,deleteContact})=>{
   
    const ContactList = ({personData})=>{
        return(
            <div className="ContactCointainer" key={personData.id}>
            <div> 
                <span className="contactName">{personData.name}: </span><span> {personData.number}</span>
            </div>
            <button className="deleteButton" id={personData.id} onClick={handleDelete}>Delete</button>
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
        <h2 className="numbersListTitle">Numbers</h2>
        <div className="numbersListContainer">
       { !persons.length?<h3>Loading...</h3>:
       newFilter? filterPersons.map((person)=><ContactList key={person.id} personData={person}/> ) 
        : 
        persons.map((person)=><ContactList key={person.id} personData={person}/> )}
       
        </div>
        </>
    );
}

export default NumberList;