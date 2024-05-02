//Object Router // Creo un objeto router
const notesRouter = require("express").Router();
const Note = require("../models/note");

//ROUTES - ENDPOINTS
notesRouter.get("/", async (request, response) => {
  try {
    const res = await Note.find({});
    response.json(res);
  } catch (exception) {
    next(exception);
  }
});

notesRouter.get("/:id", (request, response, next) => {
  const id = request.params.id;
  Note.findById(id)
    .then((note) => {
      if (!note) response.status(404).end();
      else response.json(note);
    })
    .catch((error) => next(error));
});

notesRouter.put("/:id", (request, response, next) => {
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

notesRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  Note.findByIdAndDelete(id)
    .then((response) => res.status(200).json({ deleted: "OK" }))
    .catch((err) => next(err));
});

notesRouter.post("", async (request, response, next) => {
  const body = request.body;
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  try {
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (exception) {
    next(exception);
  }
});

module.exports = notesRouter;
