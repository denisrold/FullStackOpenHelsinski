const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require("./models/note.js");

app.use(express.static("dist"));
app.use(cors());
app.use(express.json());

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

app.put("/api/notes/:id", async (request, response) => {
  const { id } = request.params;
  const { content, important } = request.body;

  const note = await Note.findById(id);
  note.content = content;
  note.important = important;
  note.save().then((newData) => response.json(newData));
});

// app.delete("/api/notes/:id", (res, req) => {
//   const id = req.params.id;
//   const deletes = notes.filter((note) => note.id === id);
//   res.status(204).end();
// });

app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content == undefined) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  note.save().then((savedNote) => response.json(note));
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
