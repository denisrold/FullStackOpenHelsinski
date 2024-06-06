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
      await page.getByText("toor logged in");
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
      await page.getByText("a note created by playwright");
      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });
    describe("when logged in can add note", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note", true);
        await createNote(page, "second note", true);
        await createNote(page, "third note", true);
      });

      // make important have class .notimportant
      // make not important have class .important
      test("importance can be changed checking two notes", async ({ page }) => {
        const otherNoteText = await page.getByText("first note");
        const secondNoteText = await page.getByText("second note");
        // select FATHER NODE.
        const otherNoteElement = await otherNoteText.locator("..");
        const secondNoteElement = await secondNoteText.locator("..");
        //change important to not important
        await otherNoteElement.locator(".notimportant").click();
        //verify new class has to be .important for make not important..
        await expect(otherNoteElement.locator(".important")).toBeVisible();
        //verify second Note is important with class .notimportant.
        await expect(secondNoteElement.locator(".notimportant")).toBeVisible();
      });

      test("importance can be changed with three element", async ({ page }) => {
        const otherNoteText = await page.getByText("second note");
        // page.pause();
        const otherdNoteElement = await otherNoteText.locator("..");
        // page.pause();
        await otherdNoteElement.locator("#testID").click();
        // page.pause();
        await expect(otherdNoteElement.locator(".important")).toBeVisible();
      });
    });
  });
});
