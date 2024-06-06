const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Note = require('../models/note');

async function initialNotes() {
  const userList = await usersInDb();
  return (initialNotes = [
    {
      content: 'HTML is easy',
      important: false,
      userId: new mongoose.Types.ObjectId(userList[0].id),
    },
    {
      content: 'Browser can execute only JavaScript',
      important: true,
      userId: new mongoose.Types.ObjectId(userList[0].id),
    },
  ]);
}

// const initialNotes = [
//   {
//     content: "HTML is easy",
//     important: false,
//     userId:
//   },
//   {
//     content: "Browser can execute only JavaScript",
//     important: true,
//   },
// ];

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' });
  await note.save();
  await note.deleteOne();
  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};
// beforeEach creating user
const userForToken = async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('Password1*', 10);
  const user = new User({
    username: 'rooter',
    passwordHash,
    name: 'Jhon Rooter',
  });

  await user.save();
};
// TokenGenerate
const userToken = async () => {
  const oneUser = await usersInDb();
  const indexUser = oneUser.findIndex((u) => u.username === 'rooter');
  const useForToken = {
    username: oneUser[indexUser].name,
    id: oneUser[indexUser].id,
  };
  const token = jwt.sign(useForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });
  return { token, id: useForToken.id };
};
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((note) => note.toJSON());
};

module.exports = {
  userToken,
  userForToken,
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
};
