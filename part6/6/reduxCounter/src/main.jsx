import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createStore } from "redux";

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "ZERO":
      return (state = 0);
    default:
      return state;
  }
};

export const store = createStore(counterReducer);

const App = () => {
  return (
    <div id=''>
      <div>{store.getState()}</div>
      <button onClick={(e) => store.dispatch({ type: "INCREMENT" })}>
        plus
      </button>
      <button onClick={(e) => store.dispatch({ type: "DECREMENT" })}>
        minus
      </button>
      <button onClick={(e) => store.dispatch({ type: "ZERO" })}>zero</button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />);
};


renderApp();
store.subscribe(renderApp);