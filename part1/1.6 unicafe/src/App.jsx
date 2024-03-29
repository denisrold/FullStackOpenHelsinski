import { useState } from 'react';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handlePoints = () => {
    setAll((prevAll) => prevAll + 1);
    setAverage(() => ((good + neutral) - bad) / (all + 1));
    setPositive(() => (good / (all + 1)) * 100);
  };

  const handleGood = () => {
    setGood((prevGood) => prevGood + 1);
    handlePoints();
  };

  const handleNeutral = () => {
    setNeutral((prevNeutral) => prevNeutral + 1);
    handlePoints();
  };

  const handleBad = () => {
    setBad((prevBad) => prevBad + 1);
    handlePoints();
  };


  const Statistics = (props) => {
    const StatisticLine = ({text,value}) => <p>{text} {value}</p>
    const StatisticButton = ({handle,name}) => <button onClick={handle}>{name}</button>

      return(
        <>
        <h1>Give feedback</h1>
        <StatisticButton  name="Good" handle={handleGood}/>
        <StatisticButton  name="neutral" handle={handleNeutral}/>
        <StatisticButton  name="Bad" handle={handleBad}/>
        <h1>Statistics:</h1>
        {all ==0? <h2>No Feedback given</h2>:<>
          <StatisticLine text={"Good"} value={good}/>
          <StatisticLine text={"Neutral"} value={neutral}/>
          <StatisticLine text={"Bad"} value={bad}/>
          <StatisticLine text={"All"} value={all}/>
          <StatisticLine text={"Average"} value={average}/>
          <StatisticLine text={"Positives"} value={positive+" %"}/>
          </>
        }
        </>)
    }
    return (
      <div>
        <Statistics />
      </div>
    )
  }

export default App;