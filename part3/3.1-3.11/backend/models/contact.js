const mongoose = require("mongoose");
require("dotenv").config();

//mongodb connection
const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

//format mongo responses
phoneBookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    //transform object _id to string and add to the object response.
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contact", phoneBookSchema);
