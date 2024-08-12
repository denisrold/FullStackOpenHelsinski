import { gql, useLazyQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import PersonForm from "../PersonForm/PersonForm";

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone 
      id
      address {
        street
        city
      }
    }
  }
`

const Persons = ({ persons }) => {
  const [getPerson, { data, loading, error }] = useLazyQuery(FIND_PERSON)
  const [person, setPerson] = useState(null)

  const showPerson = (name) => {
    getPerson({ variables: { nameToSearch: name } })
  }

  useEffect(() => {
    if (data) {
      setPerson(data.findPerson)
    }
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
 
  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>{person.address.street} {person.address.city}</div>
        <div>{person.phone}</div>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
  
    )
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p =>
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => showPerson(p.name)} >
            show address
          </button> 
        </div>  
      )}
      <PersonForm/>
    </div>
  )
}

export default Persons