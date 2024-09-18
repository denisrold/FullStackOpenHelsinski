import { Diagnosis, patientId } from "../../types";
import './EntriesBase.css';
import EntryDetails from "./EntryDetails";

const EntriesBase: React.FC<{ patient : patientId, diagnosis: Diagnosis[] | undefined }>= ({ patient,diagnosis }) => {
return <section className="EntriesSection">
      { patient.entries.length?
        <article className="listEntries">
          <h4>Entries:</h4>
          {patient.entries.map((e,i)=>(
            <ul key={i}>
            <li><b>date: </b>{e.date}</li>
            <li>{e.description}</li>
            <li>{e.diagnosisCodes? (
              <div>
                <b>DiagnosisCode:</b>
                {e.diagnosisCodes.map((d,i)=>{
                const diagnosisEntry = diagnosis?.find(l=>l.code === d)
                return(  
                <div key={i}>
                 <b>{ d }</b>{ diagnosisEntry? ` ${diagnosisEntry.name}` : null }
                </div>
                )
               }
              )}</div>): null}
            <p>Specialist {e.specialist}</p>
            <EntryDetails entry={e}/>
            </li>
            </ul>
          ))}
        </article>
        :<h4>No Entries Data.</h4>}
        </section>
}
export default EntriesBase;