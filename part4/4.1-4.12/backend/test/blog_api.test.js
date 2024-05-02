const { test, after, beforeEach, describe } = require("node:test");
const Blog = require("../models/blog");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  const newBlogs = await helper.initialBlogs.map((b) => new Blog(b));
  const promiseArray = newBlogs.map((b) => b.save());
  await Promise.all(promiseArray);
});

const api = supertest(app);

describe("Test Blog Api", () => {
  test("getAll", async () => {
    await api
      .get("/api/blogs/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("are two blogs", async () => {
    const result = await api.get("/api/blogs");
    assert.strictEqual(result.body.length, helper.initialBlogs.length);
  });

  test("a valid note can be added ", async () => {
    const noteAdd = {
      title: "Esto es el titulo de testing",
      author: "Juan Nieve",
      url: "https://estaeslaurl.com",
      likes: 200,
    };

    await api
      .post("/api/blogs")
      .send(noteAdd)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1);
    const blogsTitles = blogAtEnd.map((n) => n.title);
    assert(blogsTitles.includes("Esto es el titulo de testing"));
  });

  test("a note without title cant be added", async () => {
    const noteAdd = {
      author: "Juan Nieve",
      url: "https://estaeslaurl.com",
      likes: 200,
    };

    await api.post("/api/blogs").send(noteAdd).expect(400);
    const notesAtEnd = await helper.blogsInDb();
    assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length);
  });
  test("a note without likes, likes default is zero", async () => {
    const noteAdd = {
      title: "El Titulo del Blog",
      author: "Juan Nieve",
      url: "https://estaeslaurl.com",
    };

    await api.post("/api/blogs").send(noteAdd).expect(201);
    const notesAtEnd = await helper.blogsInDb();
    const indexNote = notesAtEnd.findIndex(
      (b) => b.title === "El Titulo del Blog"
    );
    assert(notesAtEnd[indexNote].likes == 0);
    assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length + 1);
  });

  test("a note without url cant be added", async () => {
    const noteAdd = {
      author: "Juan Nieve",
      likes: 200,
    };
    await api.post("/api/blogs").send(noteAdd).expect(400);
    const notesAtEnd = await helper.blogsInDb();
    assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length);
  });
  test("a specific blog can be viewed", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[0];
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    assert.deepStrictEqual(resultBlog.body, blogToView);
  });
});

test("note can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(200);
  const blogAtENd = await helper.blogsInDb();
  const blogsEnd = blogAtENd.map((n) => n.title);
  assert(!blogsEnd.includes(blogToDelete.title));
  assert.strictEqual(blogAtENd.length, blogsAtStart.length - 1);
});

after(async () => {
  await mongoose.connection.close();
});
