const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    res.status(401).json({ error: "invalid username or password" });
  } else {
    const useForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(useForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });
    res.status(200).send({ token, username: user.username, name: user.name });
  }
});

module.exports = loginRouter;
