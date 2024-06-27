export const createNotificaion = (content) => {
  return {
    type: "ADD_NOTIFICATION",
    payload: {
      content,
    },
  };
};

export const clearNotificaion = () => {
  return {
    type: "CLEAR_NOTIFICATION",
    payload: {
      content: "",
    },
  };
};
