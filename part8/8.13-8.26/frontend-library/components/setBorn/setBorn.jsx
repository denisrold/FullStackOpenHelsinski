import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_BORN } from '../../service/querys';

const SetBorn = ({authors}) => {

    const [ name,setName ] = useState('');
    const [ born,setBorn ] = useState(0);
    const [ editAuthor ] = useMutation(EDIT_BORN , {
        onError: (error) => {
            // Manejo de errores de GraphQL
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              const graphQLError = error.graphQLErrors[0];
              const message = graphQLError.message || 'Error desconocido.';
              console.log(message);
            } else if (error.networkError) {
              console.log('Error de red ocurrió.');
            } else {
              console.log('Error desconocido.');
            }
          },
          update: (cache, { data: { editAuthor } }) => {
            cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
              return {
                allAuthors: allAuthors.map(author =>
                  author.name === editAuthor.name ? editAuthor : author
                ),
              };
            });
          },
      });

    const editBorn = (e) => {
      e.preventDefault();  
      editAuthor({ variables: {
        name,
        born:Number(born)
        }
      })

    }
    return(
        <div>
        Set Born Year
        <form onSubmit={editBorn}>
            <label>Author Name:</label>
            <select  onChange={(e)=>setName(e.target.value)}> 
                <option value="">-</option>
                {authors.map((a,i)=>(
                <option key={i} value={a.name}>{a.name}</option>
            ))}
            </select>
           
            <label>Born:</label>
            <input onChange={(e)=>setBorn(e.target.value)} type="number" required maxLength={4}/>
            <button type="submit">Edit</button>
        </form>
        </div>
    )
}

export default SetBorn;