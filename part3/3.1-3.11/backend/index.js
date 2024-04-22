const express = require("express");
const persons = require("./data.js");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
morgan.token("body", (req) => {
  if (Object.keys(req.body).length) {
    return JSON.stringify(req.body);
  } else return;
});
app.use(morgan(":method :url :body"));

const unknowEndPoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint. NOT FOUND" });
};

//mongodb auth requeriments
const password = process.env.MONGODB_PASSWORD;
const user = process.env.MONGODB_USER;

//mongodb connection
const url = `mongodb+srv://${user}:${password}@cluster0.by5femd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
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

const Contact = mongoose.model("Contact", phoneBookSchema);
//READ
app.get("/api/info", async (req, res) => {
  const info = await Contact.find({})
    .then((result) => {
      return result.length;
    })
    .catch((err) => {
      console.log(err.message);
    });

  const date = new Date();
  res.send(`<h2>Phone has info of ${info} Peoples</h2>
  <h3>${date}</h3>`);
});

app.get("/api/persons", (req, res) => {
  Contact.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err, err.message));
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((p) => p.id === Number(id));
  if (!person) return res.status(404).json({ 404: " ID Not Found" });
  res.json({ person });
});

//DELETE
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const index = persons.findIndex((p) => p.id == Number(id));
  if (index == -1) return res.status(404).json({ 404: " ID Not Found" });
  persons.splice(index, 1);
  res.json({ persons });
});

//CREATE
app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (body.name == "" || body.number == "")
    return res.status(401).json({ error: "Not name or number" });

  const notUniqueName = persons.find((p) => p.name === body.name);
  if (notUniqueName)
    return res.status(401).json({ error: "name must be unique" });
  persons.push({ ...body, id: Math.floor(Math.random() * 100000) });
  res.json({ name: body.name, number: body.number, id: body.id });
});

//UPDATE
app.put("/api/persons/:id", (req, res) => {
  const { id } = req.params;
  const { name, number } = req.body;
  if (name == "" || number == "") {
    return res.status(401).json({ 401: "No data" });
  }
  const index = persons.findIndex((p) => p.id == Number(id));
  newData = { id, name, number };
  if (index == -1) return res.status(404).json({ 404: " ID Not Found" });
  persons[index] = { newData };

  res.json({ persons });
});

app.use(unknowEndPoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Listen port 3001");
});

app.on("close", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed due to server shutdown");
    process.exit(0);
  });
});

// Handle Ctrl+C signal to gracefully shutdown the server
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
  });
});
