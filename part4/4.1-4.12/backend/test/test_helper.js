const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Esto es el tituo de un blog",
    author: "Este es el nombre del autor",
    url: "https://estaeslaurl.com",
    likes: 392,
    id: "662f653be6aadc944abbacd4",
  },
  {
    title: "Esto es el tituo de un blog 2",
    author: "Este es el nombre del autor",
    url: "https://estaeslaurl.com",
    likes: 392,
    id: "662f6914a1658113c77b3a1c",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
