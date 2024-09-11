import { titleProps } from "../../types";

const DiariesList = (props:titleProps) => {
  return(    
  <section>
    <title>Diaries Entry</title>
    { props.diaries.map((d,i)=>(
      <div key={i}>
        <h3>{ d.date}</h3>
        <p>{d.visibility}</p>
        <p>{d.weather}</p>
      </div>)) }
  </section>
  )
}
export default DiariesList;