//Object Router // Creo un objeto router
const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");
//ROUTES - ENDPOINTS
notesRouter.get("/", async (request, response) => {
  const res = await Note.find({}).populate("userId", { username: 1, name: 1 });
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
  const user = await User.findById(request.body.userId);
  const note = new Note({
    content: body.content,
    important: body.important === "undefined" ? false : body.important,
    userId: user.id,
  });
  const savedNote = await note.save();

  user.notes = user.notes.concat(savedNote._id);
  await user.save();
  response.status(201).json(savedNote);
});

module.exports = notesRouter;
