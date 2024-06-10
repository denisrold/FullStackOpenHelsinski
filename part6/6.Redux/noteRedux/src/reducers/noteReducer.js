import { createStore } from "redux";

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.payload];
    case "TOGGLE_IMPORTANCE": {
      const { id } = action.payload;
      const noteToChange = state.find((note) => note.id === id);
      const newNote = { ...noteToChange, important: !noteToChange.important };
      return state.map((note) => (note.id !== id ? note : newNote));
    }
    default:
      return state;
  }
};
export const store = createStore(noteReducer);

export default noteReducer;
