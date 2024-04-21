const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// const password = process.argv[2];
const password = process.env.MONGODB_PASSWORD;
const user = process.env.MONGODB_USER;
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

// note1.save().then((result) => {
//   console.log("note saved!");
//   // mongoose.connection.close();
// });

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });
