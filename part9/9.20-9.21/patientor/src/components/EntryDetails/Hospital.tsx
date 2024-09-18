import { Entry } from "../../types"

export const Hospital: React.FC<{ entry : Entry }> = ({entry}) =>{
  if (entry.type === 'Hospital' ){
    return (
      <article>
        <p>date: {entry.discharge.date} - {entry.discharge.criteria}</p> 
      </article>
    )
  }
  else{ return null;}
}