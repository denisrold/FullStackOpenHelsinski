import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_PERSONS,CREATE_PERSON } from '../../queries';


const PersonForm = ({ setError, updateCacheWith }) => {
  const [ name, setName ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ street, setStreet ] = useState('')
  const [ city, setCity ] = useState('')

  const [ createPerson ]  = useMutation(CREATE_PERSON,{
      // refetchQueries: [ { query: ALL_PERSONS } ],
      onError: (error) => {
        // Manejo de errores de GraphQL
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          const graphQLError = error.graphQLErrors[0];
          const message = graphQLError.message || 'Error desconocido.';
          setError(message);
        } else if (error.networkError) {
          setError('Error de red ocurrió.');
        } else {
          setError('Error desconocido.');
        }
      },
      update: (store, response) => {
        updateCacheWith(response.data.addPerson)
      }
  });

  const submit = (e) => {
    e.preventDefault();

    createPerson({variables: {name,street,city, phone: phone.length > 0 ? phone : undefined}})

    setName('');
    setStreet('');
    setCity('');
    setPhone('');
  }
    return(
   <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone <input value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street <input value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city <input value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
    )
};

export default PersonForm;