const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("", async (request, response, next) => {
  const blogs = await Blog.find({});
  response.status(200).json(blogs);
});

blogsRouter.post("", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);
  if (!blog) response.status(404).end();
  else response.status(200).json(blog);
});

blogsRouter.put("/:id", async (request, response, next) => {
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
  await Blog.findByIdAndDelete(id);
  res.status(200).json({ deleted: "OK" });
});

module.exports = blogsRouter;
