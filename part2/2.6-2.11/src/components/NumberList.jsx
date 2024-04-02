const NumberList = ({newFilter,filterPersons,persons})=>{
    return (
        <>
        <h2>Numbers</h2>
       { !persons.length?<h3>Loading...</h3>:
       newFilter? filterPersons.map((person)=>(<p key={person.id}>{person.name} : {person.number}</p>)) : persons.map((person)=>(<p key={person.id}>{person.name}: {person.number}</p>))}
        </>
    );
}

export default NumberList;