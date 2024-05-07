const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : bcrypt.compare(password, user.passwordHash);
  if (!(user && passwordCorrect)) {
    res.status(401).json({ error: "invalid username or password" });
  }
  const userForToken = { username, id: user._id };
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });
  res.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
