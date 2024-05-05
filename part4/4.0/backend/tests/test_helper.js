const Note = require("../models/note");
const User = require("../models/user");
const mongoose = require("mongoose");

async function initialNotes() {
  const userList = await usersInDb();
  return (initialNotes = [
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
  const note = new Note({ content: "willremovethissoon" });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((note) => note.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
};
