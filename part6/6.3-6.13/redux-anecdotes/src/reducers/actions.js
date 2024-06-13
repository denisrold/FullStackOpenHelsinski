const newVote = (id, content) => {
  return { payload: { id: id }, type: "VOTE" };
};

export const createAnecdote = (content) => {
  const getId = () => (100000 * Math.random()).toFixed(0);
  return {
    type: "ADD",
    payload: {
      content: content,
      id: getId(),
      votes: 0,
    },
  };
};

export const filters = (payload) => {
  return {
    type: "FILTER",
    payload: payload,
  };
};
export default newVote;
