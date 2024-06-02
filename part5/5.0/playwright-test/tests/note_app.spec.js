const { describe, test, expect, beforeEach } = require("@playwright/test");
const { loginWith, createNote } = require("./helper");
describe("Note app", () => {
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

    test("user can be login", async ({ page }) => {
      await loginWith(page, "rooter", "Password123*");
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

    test("fail login with invalid password", async ({ page }) => {
      await loginWith(page, "rooter", "Passwrong");
      await page.getByRole("button", { name: "Login" }).click();
      //Using Locator.
      const errorDiv = await page.locator(".error");

      await expect(errorDiv).toContainText("*Invalid username or password.");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
      await expect(
        page.getByText("*Invalid username or password.")
      ).toBeVisible();
      await expect(page.getByText("toor logged in")).not.toBeVisible();
    });
  });

  describe("when logged in can add note", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "rooter", "Password123*");
    });

    test("a new note can be created", async ({ page }) => {
      await createNote(page, "a note created by playwright");
      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });
    describe("when logged in can add note", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note", true);
        await createNote(page, "second note", true);
      });

      test("importance can be changed", async ({ page }) => {
        await page.getByTestId("importance").click();
        await expect(page.locator(".notimportant")).toBeVisible();
        await page.getByTestId("importance").click();
        await expect(page.locator(".notimportant")).not.toBeVisible();
      });

      test("one of those can be made nonimportant", async ({ page }) => {
        const buttonNoteList = await page.getByTestId("importance").all();
        const firstNote = await page.getByText("first note");
        const secondNote = await page.getByText("second note");
        await buttonNoteList[0].click();
        const notImportantElements = await page.locator(".notimportant");
        const ImportantElements = await page.locator(".import");
        await expect(firstNote).toBeVisible();
        await expect(notImportantElements).toBeVisible();
        await expect(secondNote).toBeVisible();
        await expect(ImportantElements).toBeVisible();
      });
    });
  });
});
