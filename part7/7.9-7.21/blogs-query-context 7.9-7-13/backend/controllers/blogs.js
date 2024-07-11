/* eslint-disable no-underscore-dangle, quotes, comma-dangle */

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("", async (request, response) => {
  const blogs = await Blog.find({}).populate("userId", {
    username: 1,
    name: 1,
  });
  // .sort({ likes: -1 });
  response.status(200).json(blogs);
});

blogsRouter.post("", async (request, response) => {
  const blog = new Blog(request.body);
  if (request.token === undefined) {
    response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(request.user.id);
  if (!user) response.status(401).json({ error: "invalid userId" });
  blog.userId = user._id;
  user.blogs = user.blogs.concat(blog.id);
  await user.save();
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.get("/:id", async (request, response) => {
  const { id } = request.params;
  const blog = await Blog.findById(id).populate("userId", {
    username: 1,
    name: 1,
  });
  if (!blog) response.status(404).end();
  else {
    response.status(200).json(blog);
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  if (request.token === undefined) {
    response.status(401).json({ error: "Invalid token" });
  }
  const blog = await Blog.findById(id);
  if (String(blog.userId) !== request.user.id) {
    response.status(401).json({ error: "Invalid User Authorization" });
  }
  const { title, author, url } = request.body;
  const updateBlog = {
    title,
    author,
    url,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { $set: updateBlog },
    {
      new: true,
      runValidators: true,
      // context: "query",
    }
  );
  if (!updatedBlog) response.status(404).json({ err: "no such blog" });
  else response.status(200).json(updatedBlog);
});

/// /likes unlikes
blogsRouter.put("/likes/:id", async (request, response) => {
  const { blogs, unlike } = request.body;
  if (request.token === undefined) {
    response.status(401).json({ error: "token invalid" });
  }
  // const { unlike } = request.body;
  const { id } = request.params;
  const userId = request.user.id;
  let updatedBlog = {};
  if (unlike) {
    updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { likes: -1 }, $pull: { likesUserId: userId } },
      {
        new: true,
      }
    );
  } else {
    updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 }, $push: { likesUserId: userId } },
      {
        new: true,
      }
    );
  }

  response.status(200).json(updatedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (req.token === undefined) {
    res.status(401).json({ error: "Invalid token" });
  }
  const blog = await Blog.findById(id);
  if (String(blog.userId) !== req.user.id) {
    res.status(401).json({ error: "Invalid User Authorization" });
  }
  await Blog.findByIdAndDelete(id);
  res.status(204).json({ deleted: "OK" });
});

module.exports = blogsRouter;

/* eslint-enable no-underscore-dangle, quotes, comma-dangle  */
