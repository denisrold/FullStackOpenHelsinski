const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { userId: 0 });
  res.status(200).json(users);
});
// likes likess
usersRouter.get("/userid", async (req, res) => {
  if (req.token === undefined) {
    res.status(401).json({ error: "Invalid token" });
  }
  const userId = req.user.id;
  res.status(200).json(userId);
});
usersRouter.get("/user", async (req, res) => {
  if (req.token === undefined) {
    res.status(401).json({ error: "Invalid token" });
  }
  const user = await User.findById(req.user.id);
  const response = {
    username: user.username,
    name: user.name,
  };
  res.status(200).json(response);
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).",
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({ username, name, passwordHash });
  const savedUser = await user.save();
  return res.status(201).json(savedUser);
});

module.exports = usersRouter;

/* eslint-disable quotes */
