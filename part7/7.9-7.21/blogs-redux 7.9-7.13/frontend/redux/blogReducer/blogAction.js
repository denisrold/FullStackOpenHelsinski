import blogService from "../../src/service/blogs";

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

export const getBlogs = async (content) => {
  const response = [];
  console.log("getBlogs content", content);
  try {
    response = [...(await blogService.getBlogs())];
  } catch (err) {
    console.error(err.response.data);
  }
  return {
    type: "GET_BLOG",
    payload: {
      content: response.data,
    },
  };
};
