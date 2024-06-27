export const createNotification = (content) => {
  return {
    type: "ADD_NOTIFICATION",
    payload: {
      content,
    },
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
    payload: {
      content: false,
    },
  };
};
