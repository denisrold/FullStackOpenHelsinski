const express = require("express");
const persons = require("./data.js");
const morgan = require("morgan");
const app = express();

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

//READ
app.get("/api/info", (req, res) => {
  const info = persons.length;
  const date = new Date();
  res.send(`<h2>Phone has info of ${info} Peoples</h2>
  <h3>${date}</h3>`);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
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
  res.json({ persons });
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Listen port 3001");
});
