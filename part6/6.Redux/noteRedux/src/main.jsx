import React from 'react'
import ReactDOM from 'react-dom/client'
import {storeReducer} from "./reducers/noteReducer";
import './index.css'

storeReducer.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "the app state is in redux store",
    important: true,
    id: 1,
  },
});

storeReducer.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
});

const App = () => {
  return (
    <div>
      <ul>
        {storeReducer.getState().map(note => (
          <li key={note.id}>
            {note.content}
            <strong>
              {note.important ? 'important' : ''}
            </strong>
          </li>
        )
        )}
      </ul>
    </div>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
