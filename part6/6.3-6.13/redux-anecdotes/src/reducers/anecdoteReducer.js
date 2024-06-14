import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../service/anecdotes";
import notification from "../components/Notification";

// const anecdotesAtStart = [
//   "If it hurts, do it more often",
//   "Adding manpower to a late software project makes it later!",
//   "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
//   "Premature optimization is the root of all evil.",
//   "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);
const noteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      state.push(...content);
      return state.sort((a, b) => b.votes - a.votes);
    },
    setAnecdote(state, action) {
      state.push(action.payload);
    },
    newVote(state, action) {
      // const anecdoteIndex = state.findIndex((a) => a.id === action.payload);
      // state[anecdoteIndex].votes += 1;
      const anecdote = state.find((a) => a.id === action.payload);
      anecdote.votes += 1;
      return state.sort((a, b) => b.votes - a.votes);
    },
  },
});

export const { createAnecdote, newVote, setAnecdote } = noteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.getAll();
    // .then(res => res.forEach(anecdote => dispatch(createAnecdote(anecdote))))
    dispatch(createAnecdote(anecdote));
  };
};

export const createAnecdotes = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.createAnecdote(content);
    dispatch(setAnecdote(data));
  };
};

export default noteSlice.reducer;
