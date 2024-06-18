import CounterContext from "./CounterContext";
import { useContext } from "react";
import { useCounterDispatch } from "../CounterContext";
const Button = ({ type, label }) => {
  // const [counter, dispatch] = useContext(CounterContext);
  return <button onClick={() => useCounterDispatch({ type })}>{label}</button>;
};
export default Button;
