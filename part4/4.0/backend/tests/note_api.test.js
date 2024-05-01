const { test, after, beforeEach, describe } = require("node:test");
const Note = require("../models/note");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
];

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
});

const api = supertest(app);
describe("Testing Api Notes", () => {
  test.only("notes are returned as json", async () => {
    await api
      .get("/api/notes/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two notes", async () => {
    const response = await api.get("/api/notes");

    assert.strictEqual(response.body.length, initialNotes.length);
  });

  test("the first note is about HTTP methods", async () => {
    const response = await api.get("/api/notes");
    const contents = response.body.map((e) => e.content);
    //   assert.strictEqual(contents.includes("HTML is easy"), true);
    assert(contents.includes("HTML is easy"));
  });
});

after(async () => {
  await mongoose.connection.close();
});
