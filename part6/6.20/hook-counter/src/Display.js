import { useContext } from "react";
import CounterContext from "./CounterContext";
import { useCounterValue } from "../CounterContext";
const Display = () => {
  // const [counter] = useContext(CounterContext);
  return <div>{useCounterValue}</div>;
};
export default Display;
