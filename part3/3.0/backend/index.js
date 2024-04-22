const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.static("dist"));
app.use(cors());
app.use(express.json());

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

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    //transform object _id to string and add to the object response.
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).json({ Not: "notFound" });
  }
});

app.put("/api/notes/:id", (request, response) => {
  const { id } = request.params;
  const { content, important } = request.body;
  const index = notes.findIndex((p) => p.id == Number(id));
  newData = { id, content, important: important };
  if (index == -1) return res.status(404).json({ 404: " ID Not Found" });
  notes[index] = { ...newData };
  response.json({ ...newData });
});

// app.delete("/api/notes/:id", (res, req) => {
//   const id = req.params.id;
//   const deletes = notes.filter((note) => note.id === id);
//   res.status(204).end();
// });

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const note = {
    id: generateId(),
    content: body.content,
    important: Boolean(body.important) || false,
  };

  notes = notes.concat(note);

  response.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.on("close", () => {
  mongoose.connection.close().then((res) => {
    console.log("mongodb connection closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  mongoose.connection.close().then((res) => {
    app.close(() => {
      console.log("Server closed");
    });
  });
});
