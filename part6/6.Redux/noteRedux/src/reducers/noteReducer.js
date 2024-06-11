const initialState = [];
const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return [...state, action.payload];
    case "TOGGLE_IMPORTANCE": {
      const noteToChange = state.find((note) => note.id === action.payload.id);
      const newNote = { ...noteToChange, important: !noteToChange.important };
      return state.map((note) =>
        note.id !== action.payload.id ? note : newNote
      );
    }
    default:
      return state;
  }
};

export default noteReducer;
