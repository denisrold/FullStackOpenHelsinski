//Object Router // Creo un objeto router
const notesRouter = require("express").Router();
const Note = require("../models/note");

//ROUTES - ENDPOINTS
notesRouter.get("/", async (request, response) => {
  const res = await Note.find({});
  response.json(res);
});

notesRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const findNote = await Note.findById(id);
  if (!findNote) response.status(404).end();
  else response.json(findNote);
});

notesRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const { content, important } = request.body;
  const note = {
    content: content,
    important: important,
  };
  const updatedNote = await Note.findByIdAndUpdate(id, note, {
    new: true,
    runValidators: true,
    context: "query",
  });
  if (!updatedNote) response.status(404).json({ err: "no such note" });
  else response.json(updatedNote);
});

notesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.status(204).json({ deleted: "OK" });
});

notesRouter.post("", async (request, response) => {
  const body = request.body;
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });
  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

module.exports = notesRouter;
