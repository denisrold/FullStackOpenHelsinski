import CounterContext from "./CounterContext";
import { useContext } from "react";
const Button = ({ type, label }) => {
  const [counter, dispatch] = useContext(CounterContext);
  return <button onClick={() => dispatch({ type })}>{label}</button>;
};
export default Button;
