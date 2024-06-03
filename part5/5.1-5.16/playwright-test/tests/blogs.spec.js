const { describe, test, expect, beforeEach } = require("@playwright/test");
const { loginWith } = require("./helper");

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
});
