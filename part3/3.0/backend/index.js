const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Note = require("./models/note.js");
const errorHandler = require("./errorHandler.js");

const unknowEndPoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint. 404 NOT FOUND" });
};

//MORGAN CONFIGURATION  - SET.
morgan.token("body", (req) => {
  if (Object.keys(req.body).length) {
    return JSON.stringify(req.body);
  } else return;
});

//MIDDLERWARES
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :body"));

//ROUTES - ENDPOINTS
app.get("/", (request, response, next) =>
  response.send("<h1>Hello World!</h1>")
);

app.get("/api/notes", (request, response) => {
  Note.find({})
    .then((result) => response.json(result))
    .catch((err) => next(err));
});

app.get("/api/notes/:id", (request, response, next) => {
  const id = request.params.id;
  Note.findById(id)
    .then((note) => {
      if (!note) response.status(404).end();
      else response.json(note);
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (request, response, next) => {
  const { id } = request.params;
  const { content, important } = request.body;
  const note = {
    content: content,
    important: important,
  };
  Note.findByIdAndUpdate(id, note, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedNote) => {
      if (!updatedNote) response.status(404).json({ err: "no such note" });
      else response.json(updatedNote);
    })
    .catch((err) => next(err));
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  Note.findByIdAndDelete(id)
    .then((response) => res.status(200).json({ deleted: "OK" }))
    .catch((err) => next(err));
});

app.post("/api/notes", (request, response, next) => {
  const body = request.body;
  // pre-validation version
  // if (!body.content) {
  //   return response.status(400).json({
  //     error: "content missing",
  //   });
  // }
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => response.json(note))
    .catch((err) => next(err));
});

//MIDDLEWARE 404 NOT FOUND / ERRORSHANDLER
app.use(unknowEndPoint);
app.use(errorHandler);

//SERVER AND MONGODB CONNECTION CLOSE.
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
