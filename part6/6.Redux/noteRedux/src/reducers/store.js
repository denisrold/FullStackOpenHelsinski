import { createStore, combineReducers } from "redux";
import noteReducer from "./noteReducer";
import filterReducer from "./filterReducer";

const reducer = combineReducers({
  note: noteReducer,
  filter: filterReducer,
});

const store = createStore(reducer);

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "the app state is in redux store",
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
});

export default store;
