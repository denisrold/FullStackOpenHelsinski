const mongoose = require("mongoose");
require("dotenv").config();

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const url = `mongodb+srv://${user}:${password}@cluster0.by5femd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// change to module.exports
//const Note = mongoose.model("Note", noteSchema);

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    //transform object _id to string and add to the object response.
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
