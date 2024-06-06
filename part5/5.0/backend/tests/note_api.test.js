const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Note = require("../models/note");
const app = require("../app");
const helper = require("./test_helper");
const user = require("../models/user");

beforeEach(async () => {
  await Note.deleteMany({});
  await user.deleteMany({});
  await helper.userForToken();
  const notes = await helper.initialNotes();
  // promiseAll Order together
  const newNotes = notes.map((n) => new Note(n));
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
    const notesLength = await helper.initialNotes();
    assert.strictEqual(response.body.length, notesLength.length);
  });

  test("a specific is within returned notes", async () => {
    const response = await api.get("/api/notes");
    const contents = response.body.map((e) => e.content);
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
      const resultNoteID = new mongoose.Types.ObjectId(resultNote.body.userId);
      resultNote.body.userId = resultNoteID;
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
      const tokenInfo = await helper.userToken();
      const newNote = {
        content: "async/await simplifies making async calls",
        important: true,
        userId: new mongoose.Types.ObjectId(tokenInfo.id),
      };

      await api
        .post("/api/notes")
        .set("Authorization", `Bearer ${tokenInfo.token}`)
        .send(newNote)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      // check db length
      const notesAtEnd = await helper.notesInDb();
      const intialNotes = await helper.initialNotes();
      assert.strictEqual(notesAtEnd.length, intialNotes.length + 1);
      // checking exist added note.
      const contents = notesAtEnd.map((n) => n.content);
      assert(contents.includes("async/await simplifies making async calls"));
    });
    test("fails with status code 401 if no token", async () => {
      const tokenInfo = await helper.userToken("useruseruser");
      const newNote = {
        important: true,
        userId: new mongoose.Types.ObjectId(tokenInfo.id),
      };
      await api.post("/api/notes").send(newNote).expect(401);
      // checking db
      const notesAtEnd = await helper.notesInDb();
      const initialNotes = await helper.initialNotes();
      assert.strictEqual(notesAtEnd.length, initialNotes.length);
    });
    test("fails with status code 400 if data invalid", async () => {
      const tokenInfo = await helper.userToken();

      const newNote = {
        important: true,
        userId: new mongoose.Types.ObjectId(tokenInfo.id),
      };
      await api
        .post("/api/notes")
        .send(newNote)
        .set("Authorization", `Bearer ${tokenInfo.token}`)
        .expect(400);
      // checking db
      const notesAtEnd = await helper.notesInDb();
      const initialNotes = await helper.initialNotes();
      assert.strictEqual(notesAtEnd.length, initialNotes.length);
    });
  });
  describe("deletion of a note", () => {
    test("succeds with status code 204 if id is valid", async () => {
      const notesAtStart = await helper.notesInDb();
      const tokenInfo = await helper.userToken();
      const noteToDelete = notesAtStart[0];

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .set("Authorization", `Bearer ${tokenInfo.token}`)
        .expect(204);

      const noteAtENd = await helper.notesInDb();
      const notesEnd = noteAtENd.map((n) => n.content);
      assert(!notesEnd.includes(noteToDelete.content));
      assert.strictEqual(noteAtENd.length, notesAtStart.length - 1);
    });
  });
});
after(async () => {
  await mongoose.connection.close();
});
