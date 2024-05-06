const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("", async (request, response, next) => {
  const blogs = await Blog.find({}).populate("userId", {
    username: 1,
    name: 1,
  });
  response.status(200).json(blogs);
});

blogsRouter.post("", async (request, response) => {
  const blog = new Blog(request.body);
  if (request.token === undefined)
    return response.status(401).json({ error: "token invalid" });

  const user = await User.findById(request.user.id);
  if (!user) return response.status(401).json({ error: "invalid userId" });

  user.blogs = user.blogs.concat(blog.id);
  await user.save();

  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);
  if (!blog) response.status(404).end();
  else response.status(200).json(blog);
});

blogsRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { title, author, url, likes } = request.body;
  const blog = {
    title,
    author,
    url,
    likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    //runValidators: true,
    //context: "query",
  });
  if (!updatedBlog) response.status(404).json({ err: "no such blog" });
  else response.status(200).json(updatedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (req.token === undefined) {
    res.status(401).json({ error: "Invalid token" });
  }
  const blog = await Blog.findById(id);
  if (blog.userId != req.user.id) {
    res.status(401).json({ error: "Invalid User Authorization" });
  }
  await Blog.findByIdAndDelete(id);
  res.status(204).json({ deleted: "OK" });
});

module.exports = blogsRouter;
