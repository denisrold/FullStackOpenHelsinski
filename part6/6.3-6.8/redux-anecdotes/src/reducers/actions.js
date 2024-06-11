const newVote = (id, content) => {
  return { payload: { id: id }, type: "VOTE" };
};

export default newVote;
