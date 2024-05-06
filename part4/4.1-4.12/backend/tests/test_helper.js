const Blog = require("../models/blog");
const User = require("../models/user");

async function initialBlogsFn() {
  const userList = await usersInDb();
  return (initialBlogs = [
    {
      content: "HTML is easy",
      important: false,
      userId: new mongoose.Types.ObjectId(userList[0].id),
    },
    {
      content: "Browser can execute only JavaScript",
      important: true,
      userId: new mongoose.Types.ObjectId(userList[0].id),
    },
  ]);
}

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
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  usersInDb,
  nonExistingId,
  blogsInDb,
};
