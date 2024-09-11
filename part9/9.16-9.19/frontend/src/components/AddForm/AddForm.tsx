import { useEffect, useState } from "react";
import { sensitivityDiaryes, Visibility, Weather } from "../../types";
import { createFlight } from "../../services/flightServices";

const AddForm = ()=>{
  const [errorCreate,setErrorCreate] =useState<string>('');
  
  useEffect(()=>{
    if (errorCreate) {
      const timer = setTimeout(() => {
        setErrorCreate('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  },[errorCreate])

  const [flight, setFlight] = useState<sensitivityDiaryes>( {
    date:'',
    weather:Weather.Sunny,
    visibility: Visibility.Good,
    comment:''
  });

  const diaryCreate = async  (event : React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    try{
      await createFlight(flight)
    }
    catch(err:unknown){
      if(err instanceof Error) {
        setErrorCreate(err.message);
      }
    }
  }

  const inputHandle = (event : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
    event.preventDefault();
    const {name, value} = event.target;
    setFlight((prevFlight) => ({...prevFlight, [name]: value}));
  }
  return (
    <> 
    {errorCreate && <span style={{ color: 'red' }}>{errorCreate}</span>} 
      <form onSubmit={diaryCreate}>
        <label> date </label>
        <input type='date' name='date' onChange={inputHandle} value={flight.date}></input>
        <label> visibility </label>
        <input name='visibility' onChange={inputHandle} value={flight.visibility}></input>
        <label> weather </label>
        <input name="weather" onChange={inputHandle} value={flight.weather}></input>
        <label> comment </label>
        <input name='comment' onChange={inputHandle} value={flight.comment}></input>
       <button type='submit'>Add Entry</button>
      </form>
    </>
  )
}

export default AddForm;