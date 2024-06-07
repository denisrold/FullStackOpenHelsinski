const { describe, test, expect, beforeEach } = require("@playwright/test");
const { loginWith, newBlog } = require("./helper");

describe("Testing Blog App", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "toor",
        username: "rooter",
        password: "Password123*",
      },
    });
    await page.goto("/");
  });

  describe("Login", () => {
    test("Login form is shown", async ({ page }) => {
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.locator('[name="LoginForm"]')).toBeVisible();
    });

    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "rooter", "Password123*");
      await page.waitForTimeout(2000);
      const userInfo = page.locator('[name="userInfo"]').waitFor();
      await expect(page.locator('[name="userInfo"]')).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "rooter", "wrong*");
      await expect(
        page.getByText("* Invalid username or password.")
      ).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "rooter", "Password123*");
    });
    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "Add Blog" }).click();
      const formContainer = await page.locator(".formAdd");
      await formContainer.locator('input[name="title"]').fill("New Title");
      await formContainer.locator('input[name="author"]').fill("New Author");
      await formContainer
        .locator('input[name="url"]')
        .fill("http://newurl.com");
      await formContainer.getByText("Add").click();
      await expect(
        page.getByRole("heading", { name: "New Title", exact: true })
      ).toBeVisible();
    });
  });
  describe("When added blogs i can", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "rooter", "Password123*");
      await newBlog(page, "New Title", "New Author", "http://localweb.co");
    });
    test("a new blog can be edited", async ({ page }) => {
      //event dialog configuration.
      await page.on("dialog", async (dialog) => {
        await dialog.accept();
      });
      await page.getByRole("button", { name: "show" }).click();
      await page.waitForSelector(".blogButtons");
      const sectionEdit = await page.locator(".blogButtons");
      await sectionEdit.locator("#openEditButton").click();
      await page.getByTestId("updateTitle").fill("Test Title");
      await page.getByTestId("updateAuthor").fill("Test Author");
      await page.getByTestId("updateUrl").fill("http://testutl.co");
      await page.getByTestId("editBlog").click();
      await page.waitForSelector("#testTitle");
      const upgradedVisible = await page.getByText("Test Title");
      await expect(upgradedVisible).toBeVisible();
    });

    test("like a blog", async ({ page }) => {
      await page.getByRole("button", { name: "show" }).click();
      await page.waitForSelector(".Liked");
      const LikeBeforeCount = await page
        .locator(".likeContainer")
        .getByTestId("likecount");
      const LikeBefore = await LikeBeforeCount.innerText();
      await page.getByTestId("likeButton").click();
      await page.waitForTimeout(3000);
      const LikeAfterCount = await page
        .locator(".likeContainer")
        .getByTestId("likecount");
      const LikeAfter = await LikeAfterCount.innerText();
      await expect(LikeBefore).not.toBe(LikeAfter);
    });
    test("a blog can be deleted", async ({ page }) => {
      await page.on("dialog", async (dialog) => {
        await dialog.accept();
      });
      await page.getByRole("button", { name: "show" }).click();
      await page.waitForSelector(".blogButtons");
      await page.locator("#deleteButton").click();
      await page.getByTestId("noBlogs");
      await expect(page.getByTestId("noBlogs")).toBeVisible();
    });
    test("Cant delete blogs created by other user", async ({
      page,
      request,
    }) => {
      await request.post("/api/users", {
        data: {
          name: "new user",
          username: "cantdelete",
          password: "Password123*",
        },
      });
      await page.getByTestId("LogoutButton").click();
      await loginWith(page, "cantdelete", "Password123*");
      await page.getByRole("button", { name: "show" }).click();
      const sectionEdit = await page.locator(".blogButtons");
      const user = await page.getByText("toor");
      await expect(user).toBeVisible();
      await expect(sectionEdit).not.toBeVisible();
    });
  });

  describe("Order Blogs By likes", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "rooter", "Password123*");
      await newBlog(page, "New Title", "New Author", "http://localweb.co");
    });

    test("blogs sort by likes", async ({ page }) => {
      await page
        .getByRole("heading", { name: "New Title", exact: true })
        .waitFor();
      await newBlog(page, "TestLikeSort", "Test Author", "http://newTest.com");
      await page
        .getByRole("heading", { name: "TestLikeSort", exact: true })
        .waitFor();
      await expect(
        page.getByRole("heading", { name: "TestLikeSort", exact: true })
      ).toBeVisible();
      //like to second blog.NOW MOST LIKED.
      const blog = await page.getByRole("heading", {
        name: "TestLikeSort",
        exact: true,
      });
      await blog.locator("../..").getByRole("button", { name: "show" }).click();
      await blog.locator("../..").getByTestId("likeButton").click();
      await page.waitForTimeout(1000);
      // refresh page
      await page.reload();
      // waiting reload complete
      await page.waitForLoadState("domcontentloaded");
      await page.waitForTimeout(2000);
      await page.waitForSelector(".bodyContainer");
      const bodyContainer = await page.getByTestId("blogContainer");
      const titles = await bodyContainer.locator("h4").allTextContents();
      // most likes first :)
      expect(titles[0]).toBe("TestLikeSort");
    });
  });
});
