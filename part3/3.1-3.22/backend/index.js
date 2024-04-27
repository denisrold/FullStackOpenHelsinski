const express = require("express");
// const persons = require('./data.js');
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const Contact = require("./models/contact");
const errorHandler = require("./errorHandlers");
// MIDDLEWARES
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());

// MORGAN CONFIGURATION  - SET.
// eslint-disable-next-line consistent-return
morgan.token("body", (req) => {
  if (Object.keys(req.body).length) {
    return JSON.stringify(req.body);
  }
});
app.use(morgan(":method :url :body"));

const unknowEndPoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint. 404 NOT FOUND" });
};

// READ
app.get("/api/info", async (req, res, next) => {
  const info = await Contact.find({})
    .then((result) => result.length)
    .catch((err) => next(err));

  const date = new Date();
  res.send(`<h2>Phone has info of ${info} Peoples</h2>
  <h3>${date}</h3>`);
});

app.get("/api/persons", (req, res, next) => {
  Contact.find({})
    .sort({ name: 1 })
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Contact.findById(id)
    .then((p) => {
      if (!p) res.status(404).json({ err: "no such contact" });
      else res.json(p);
    })
    .catch((err) => next(err));
});

// DELETE
app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Contact.findByIdAndDelete(id)
    .then(() => res.status(200).json({ deleted: "OK" }))
    .catch((err) => next(err));

  // const index = persons.findIndex((p) => p.id == Number(id));
  // if (index == -1) return res.status(404).json({ 404: " ID Not Found" });
  // persons.splice(index, 1);
});

// CREATE
app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  Contact.create({ name, number })
    .then((response) => res.status(201).json(response))
    .catch((err) => next(err));

  //* *********** PRE-VALIDATION VERSION: ***************

  // if (body.name == "" || body.number == "")
  //   return res.status(401).json({ error: "Not name or number" });
  // Contact.findOne({ name: body.name })
  //   .then((existingContact) => {
  //     if (existingContact)
  //       return res
  //         .status(400)
  //         .json({ Error: `Name: ${body.name} already exist` });
  //     else {
  //       const newContact = new Contact({
  //         name: body.name,
  //         number: body.number,
  //       });
  //       newContact.save().then((c) => res.status(201).json(c));
  //     }
  //   }).catch((err) => next(err));
});

// UPDATE
// eslint-disable-next-line consistent-return
app.put("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, number } = req.body;
  if (name === "" || number === "") {
    return res.status(401).json({ 401: "No data" });
  }
  const contact = {
    name,
    number,
  };
  Contact.findByIdAndUpdate(id, contact, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((c) => {
      if (!c) res.status(404).json({ err: "no such contact" });
      else res.status(200).json(c);
    })
    .catch((err) => next(err));
});

app.use(unknowEndPoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listen port ${PORT}`);
});

app.on("close", () => {
  mongoose.connection.close(() => {
    // eslint-disable-next-line no-console
    console.log("MongoDB connection closed due to server shutdown");
    process.exit(0);
  });
});

// Handle Ctrl+C signal to gracefully shutdown the server
process.on("SIGINT", () => {
  app.close(() => {
    // eslint-disable-next-line no-console
    console.log("Server closed");
  });
});
