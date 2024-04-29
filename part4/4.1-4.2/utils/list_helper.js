const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs.length) return 0;
  const likes = blogs.reduce((total, blog) => {
    return total + blog.likes;
  }, 0);
  return likes;
};

module.exports = { dummy, totalLikes };
