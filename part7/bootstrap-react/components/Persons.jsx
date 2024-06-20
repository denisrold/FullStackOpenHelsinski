const Persons = ({persons}) => {
    return(
    <>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </>
    )
}
export default Persons;