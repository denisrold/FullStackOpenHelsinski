const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

async function initialBlogsFn() {
  await User.deleteMany({});
  const user = await User.create({
    username: "root",
    name: "User",
    password: "Password123*",
  });
  const id = user._id;
  return [
    {
      title: "tremendo primer blog",
      author: "jhon primero",
      url: "https://estaeslaurl.com",
      likes: 392,
      userId: id,
    },
    {
      title: "Esto es el tituo de un blog dos",
      author: "Este es el nombre del autor",
      url: "https://estaeslaurl.com",
      likes: 100,
      userId: id,
    },
  ];
}

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

const blogsById = async (id) => {
  const blogs = await Blog.findById(id);
  return blogs;
};
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((blog) => blog.toJSON());
};
const userToken = async (req, res) => {
  const user = await usersInDb();
  const userIndex = user.findIndex((u) => u.username == "root");
  const userForToken = {
    username: user[userIndex].username,
    id: user[userIndex].id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });
  return { token, id: user[userIndex].id };
};

module.exports = {
  initialBlogsFn,
  usersInDb,
  nonExistingId,
  blogsInDb,
  userToken,
  blogsById,
};
