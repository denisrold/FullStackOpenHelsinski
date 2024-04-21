const mongoose = require("mongoose");
require("dotenv").config();

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// const password = process.argv[2];
const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const url = `mongodb+srv://${user}:${password}@cluster0.by5femd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// const note1 = new Note({
//   content: "HTML is easy",
//   important: true,
// });
// const note2 = new Note({
//   content: "Browser can execute only JavaScript",
//   important: false,
// });
// const note3 = new Note({
//   content: "GET and POST are the most important methods of HTTP protocol",
//   important: true,
// });

// note1.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

// note2.save().then((result) => {
//   console.log("note saved!");
//   // mongoose.connection.close();
// });
// note3.save().then((result) => {
//   console.log("note saved!");
//   // mongoose.connection.close();
// });

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
