const { describe, test, expect, beforeEach } = require("@playwright/test");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "toor",
        username: "rooter",
        password: "Password123*",
      },
    });
    await page.goto("http://localhost:5173");
  });

  describe("login", () => {
    test("front page can be opened", async ({ page }) => {
      const locator = await page.getByText("Notes");
      await expect(locator).toBeVisible();
      await expect(
        page.getByText(
          "Note app, Department of Computer Science, University of Helsinki 2024"
        )
      ).toBeVisible();
    });

    test("can be login", async ({ page }) => {
      await page.getByRole("button", { name: "Login" }).click();
      await page.getByRole("textbox").first().fill("rooter");
      await page.getByRole("textbox").last().fill("Password123*");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByText("toor logged in")).toBeVisible();
    });

    test("login form can be opened", async ({ page }) => {
      await page.getByRole("button", { name: "Login" }).click();
      const textboxes = await page.getByRole("textbox").all();
      await textboxes[0].fill("rooter");
      await textboxes[1].fill("Password123*");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByText("toor logged in")).toBeVisible();
    });

    test("loggin by test-id", async ({ page }) => {
      await page.getByRole("button", { name: "Login" }).click();
      await page.getByTestId("username").fill("rooter");
      await page.getByTestId("password").fill("Password123*");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.getByText("toor logged in")).toBeVisible();
    });
  });

  describe("when logged in can add note", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "Login" }).click();
      await page.getByTestId("username").fill("rooter");
      await page.getByTestId("password").fill("Password123*");
      await page.getByRole("button", { name: "Login" }).click();
    });

    test("a new note can be created", async ({ page }) => {
      await page.getByRole("button", { name: "Create Notes" }).click();
      await page.getByRole("textbox").fill("a note created by playwright");
      await page.getByRole("button", { name: "ADD" }).click();
      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });

    test("importance can be changed", async ({ page }) => {
      await page.getByRole("button", { name: "Create Notes" }).click();
      await page.getByRole("textbox").fill("a note created by playwright");
      await page.getByRole("button", { name: "ADD" }).click();
      await page.getByTestId("importance").click();
      await expect(page.locator(".notimportant")).toBeVisible();
      await page.getByTestId("importance").click();
      await expect(page.locator(".notimportant")).not.toBeVisible();
    });
  });
});
