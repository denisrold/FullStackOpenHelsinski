const initialFilters = "";

const filterReducer = (state = initialFilters, action) => {
  if (action.type === "FILTER") {
    return action.payload;
  }
  return state;
};

export default filterReducer;
