const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
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
  response.json(notes);
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