const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("", (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs).catch((err) => next(err));
    })
    .catch((err) => next(err));
});

blogsRouter.post("", (request, response, next) => {
  const blog = new Blog(request.body);
  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((err) => next(err));
});

blogsRouter.get("/:id", (request, response, next) => {
  const id = request.params.id;
  Blog.findById(id)
    .then((blog) => {
      if (!blog) response.status(404).end();
      else response.json(blog);
    })
    .catch((error) => next(error));
});

blogsRouter.put("/:id", (request, response, next) => {
  const { id } = request.params;
  const { title, author, url, likes } = request.body;
  const blog = {
    title,
    author,
    url,
    likes,
  };

  Blog.findByIdAndUpdate(id, blog, {
    new: true,
    //runValidators: true,
    //context: "query",
  })
    .then((updatedBlog) => {
      if (!updatedBlog) response.status(404).json({ err: "no such blog" });
      else response.json(updatedBlog);
    })
    .catch((err) => next(err));
});

blogsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  Blog.findByIdAndDelete(id)
    .then(() => res.status(200).json({ deleted: "OK" }))
    .catch((err) => next(err));
});

module.exports = blogsRouter;
