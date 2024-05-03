const { test, after, beforeEach, describe } = require("node:test");
const Note = require("../models/note");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

beforeEach(async () => {
  await Note.deleteMany({});

  //two forms of resolve PROMISES
  // lineal order of note promises resolve.
  // for (let note of helper.initialNotes) {
  //   let newNote = new Note(note);
  //   await newNote.save();
  // }

  //promiseAll Order together
  const newNotes = helper.initialNotes.map((n) => new Note(n));
  const promiseArray = newNotes.map((n) => n.save());
  await Promise.all(promiseArray);
});

const api = supertest(app);
describe("When there is initially some notes saved", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all notes are returned", async () => {
    const response = await api.get("/api/notes");
    assert.strictEqual(response.body.length, helper.initialNotes.length);
  });

  test("a specific is within returned notes", async () => {
    const response = await api.get("/api/notes");
    const contents = response.body.map((e) => e.content);
    //   assert.strictEqual(contents.includes("HTML is easy"), true);
    assert(contents.includes("HTML is easy"));
  });
  describe("viewing a specific Note", () => {
    test("succeds with a valid ID", async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToView = notesAtStart[0];
      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);
      assert.deepStrictEqual(resultNote.body, noteToView);
    });
    test("fails with a status code 404 invalid note id not found", async () => {
      const noteID = new mongoose.Types.ObjectId();
      await api.get(`/api/notes/${noteID}`).expect(404);
    });
    test("fails with a status code 400 invalid ID", async () => {
      const noteID = "ID";
      await api.get(`/api/notes/${noteID}`).expect(400);
    });
  });

  describe("adition of a new note", () => {
    test("succeds with valid data", async () => {
      const newNote = {
        content: "async/await simplifies making async calls",
        important: true,
      };

      await api
        .post("/api/notes")
        .send(newNote)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      //check db length
      const notesAtEnd = await helper.notesInDb();
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);
      //checking exist added note.
      const contents = notesAtEnd.map((n) => n.content);
      assert(contents.includes("async/await simplifies making async calls"));
    });

    test("fails with status code 400 if data invalid", async () => {
      const newNote = {
        important: true,
      };
      await api.post("/api/notes").send(newNote).expect(400);
      //checking db
      const notesAtEnd = await helper.notesInDb();
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);
    });
    describe("deletion of a note", () => {
      test("succeds with status code 204 if id is valid", async () => {
        const notesAtStart = await helper.notesInDb();
        const noteToDelete = notesAtStart[0];
        await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);
        const noteAtENd = await helper.notesInDb();
        const notesEnd = noteAtENd.map((n) => n.content);
        assert(!notesEnd.includes(noteToDelete.content));
        assert.strictEqual(noteAtENd.length, notesAtStart.length - 1);
      });
    });
  });
});
after(async () => {
  await mongoose.connection.close();
});
