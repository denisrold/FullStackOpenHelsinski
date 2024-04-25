const mongoose = require("mongoose");
require("dotenv").config();

if (process.argv.length < 4) {
  console.log("give data name and number as argument");
  console.log('Example: node mongo.js "Anna heizenberg" "040-1234556"');
  process.exit(1);
}
//mongodb auth requeriments
const password = process.env.MONGODB_PASSWORD;
const user = process.env.MONGODB_USER;

//data arguments
const name = process.argv[2];
const number = process.argv[3];

//mongodb connection
const url = `mongodb+srv://${user}:${password}@cluster0.by5femd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", phoneBookSchema);

const contact = new Contact({
  name: name,
  number: number,
});

contact
  .save()
  .then((result) => {
    console.log({ "contact saved!": contact });
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));

// Contact.find({})
//   .then((result) => {
//     result.forEach((note) => {
//       console.log(note);
//     });
//     mongoose.connection.close();
//   })
//   .catch((err) => console.log(err));
