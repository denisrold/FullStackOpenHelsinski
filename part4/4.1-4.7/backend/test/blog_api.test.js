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
});

after(async () => {
  await mongoose.connection.close();
});
