export const createBlog = (content) => {
  return {
    type: "ADD_BLOG",
    payload: {
      content,
    },
  };
};
export const deleteBlog = (content) => {
  return {
    type: "DELETE_BLOG",
    payload: {
      content,
    },
  };
};
export const updateBlog = (content) => {
  return {
    type: "UPDATE_BLOG",
    payload: {
      content,
    },
  };
};

export const getBlogs = (content) => {
  return {
    type: "GET_BLOG",
    payload: {
      content,
    },
  };
};
