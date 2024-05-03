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

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs/")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const result = await api.get("/api/blogs");
    assert.strictEqual(result.body.length, helper.initialBlogs.length);
  });
  test("a specific blog is within the returned blogs", async () => {
    const result = await api.get("/api/blogs");
    const titles = result.body.find(
      (b) => b.title === helper.initialBlogs[0].title
    );
    assert(titles);
  });

  describe("viewing a specific blog", () => {
    test("succeeds with a vaid id", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToView = blogsAtStart[0];
      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);
      assert.deepStrictEqual(resultBlog.body, blogToView);
    });

    test("fail with status code 404 if blog not existing", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await api.get(`/api/blogs/${fakeId}`).expect(404);
    });

    test("fails with status code 400 a invalid id", async () => {
      const invalidID = "123";
      await api.get(`/api/blogs/${invalidID}`).expect(400);
    });
  });

  describe("adition of a new blog", () => {
    test("succeds with valid data", async () => {
      const blogAdd = {
        title: "Esto es el titulo de testing",
        author: "Juan Nieve",
        url: "https://estaeslaurl.com",
        likes: 200,
      };

      await api
        .post("/api/blogs")
        .send(blogAdd)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1);
      const blogsTitles = blogAtEnd.map((n) => n.title);
      assert(blogsTitles.includes("Esto es el titulo de testing"));
    });

    test("fails with a status 400 if data invalid", async () => {
      const noteAdd = {
        author: "Juan Nieve",
        url: "https://estaeslaurl.com",
        likes: 200,
      };

      await api.post("/api/blogs").send(noteAdd).expect(400);
      const notesAtEnd = await helper.blogsInDb();
      assert.strictEqual(notesAtEnd.length, helper.initialBlogs.length);
    });
    test("a blog without likes, likes default is zero", async () => {
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

    test("fails with a status 400 if data invalid", async () => {
      const blogAdd = {
        author: "Juan Nieve",
        likes: 200,
      };
      await api.post("/api/blogs").send(blogAdd).expect(400);
      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
  });
  describe("deletion of a blog", () => {
    test("blog can be deleted", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];
      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(200);
      const blogAtENd = await helper.blogsInDb();
      const blogsEnd = blogAtENd.map((n) => n.title);
      assert(!blogsEnd.includes(blogToDelete.title));
      assert.strictEqual(blogAtENd.length, blogsAtStart.length - 1);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
