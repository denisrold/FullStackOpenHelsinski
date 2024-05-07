const { test, after, beforeEach, describe } = require("node:test");
const Blog = require("../models/blog");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  const initialBlogs = await helper.initialBlogsFn();
  const newBlogs = initialBlogs.map((b) => new Blog(b));
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
    const initialBlogs = await helper.initialBlogsFn();
    assert.strictEqual(result.body.length, initialBlogs.length);
  });
  test("a specific blog is within the returned blogs", async () => {
    const result = await api.get("/api/blogs");
    const initialBlogs = await helper.initialBlogsFn();
    const titles = result.body.find((b) => b.title === initialBlogs[0].title);
    assert(titles);
  });

  describe("viewing a specific blog", () => {
    test("succeeds with a valid id", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToView = blogsAtStart[0];
      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const resultNoteID = new mongoose.Types.ObjectId(resultBlog.body.userId);
      resultBlog.body.userId = resultNoteID;
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
      const initialBlogs = await helper.initialBlogsFn();
      const token = await helper.userToken();
      const blogAdd = {
        title: "Esto es el titulo de testing",
        author: "Juan Nieve",
        url: "https://estaeslaurl.com",
        likes: 200,
        userId: token.id,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token.token}`)
        .send(blogAdd)
        .expect(201)
        .expect("Content-Type", /application\/json/);
      const blogAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogAtEnd.length, initialBlogs.length + 1);
      const blogsTitles = blogAtEnd.map((n) => n.title);
      assert(blogsTitles.includes("Esto es el titulo de testing"));
    });
    test("fails with a status 401  unauthorized", async () => {
      const token = await helper.userToken();
      const initialBlogs = await helper.initialBlogsFn();
      const noteAdd = {
        title: "Esto es el titulo de testing",
        author: "Juan Nieve",
        url: "https://estaeslaurl.com",
        likes: 200,
        userId: new mongoose.Types.ObjectId(token.id),
      };

      await api.post("/api/blogs").send(noteAdd).expect(401);
      const notesAtEnd = await helper.blogsInDb();
      assert.strictEqual(notesAtEnd.length, initialBlogs.length);
    });

    test("fails with a status 400 if data invalid", async () => {
      const initialBlogs = await helper.initialBlogsFn();
      const token = await helper.userToken();
      const blogAdd = {
        author: "Juan Nieve",
        url: "https://estaeslaurl.com",
        likes: 200,
        userId: token.id,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token.token}`)
        .send(blogAdd)
        .expect(400)
        .expect("Content-Type", /application\/json/);
      const blogAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogAtEnd.length, initialBlogs.length);
    });
    test("a blog without likes, likes default is zero", async () => {
      const token = await helper.userToken();
      const noteAdd = {
        title: "El Titulo del Blog",
        author: "Juan Nieve",
        url: "https://estaeslaurl.com",
        userId: token.id,
      };

      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token.token}`)
        .send(noteAdd)
        .expect(201);
      const notesAtEnd = await helper.blogsInDb();
      const indexNote = notesAtEnd.findIndex(
        (b) => b.title === "El Titulo del Blog"
      );
      assert(notesAtEnd[indexNote].likes == 0);
      const initialBlogs = await helper.initialBlogsFn();
      assert.strictEqual(notesAtEnd.length, initialBlogs.length + 1);
    });
  });

  describe("upgrading a blog", () => {
    test("blog can be upgraded", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpgrade = {
        id: blogsAtStart[0].id,
        likes: blogsAtStart[0].likes + 1,
        title: blogsAtStart[0].title,
        url: blogsAtStart[0].url,
        author: blogsAtStart[0].author,
        userId: blogsAtStart[0].userId,
      };

      await api
        .put(`/api/blogs/${blogToUpgrade.id}`)
        .send(blogToUpgrade)
        .expect(200);

      const blogsAtENd = await helper.blogsInDb();
      const blogsUpdatedIndex = blogsAtENd.findIndex(
        (b) => b.title === blogsAtStart[0].title
      );
      assert.strictEqual(
        blogsAtENd[blogsUpdatedIndex].likes,
        blogsAtStart[0].likes + 1
      );
    });
  });

  describe("deletion of a blog", () => {
    test("succeds with status code 204 if id is valid", async () => {
      const token = await helper.userToken();
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", `Bearer ${token.token}`)
        .expect(204);
      const blogAtENd = await helper.blogsInDb();
      const blogsEnd = blogAtENd.map((n) => n.title);
      assert(!blogsEnd.includes(blogToDelete.title));
      assert.strictEqual(blogAtENd.length, blogsAtStart.length - 1);
    });
    test("fails with status code 400 if id is invalid", async () => {
      const token = await helper.userToken();
      const invalidID = "asdads";
      await api
        .delete(`/api/blogs/${invalidID}`)
        .set("Authorization", `Bearer ${token.token}`)
        .expect(400);
    });
    test("fails with status code 401 unauthorized if no valid token", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];
      const invalidID = "asdads";
      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
