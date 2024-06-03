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

  test("Login form is shown", async ({ page }) => {
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator('[name="LoginForm"]')).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "rooter", "Password123*");
      await expect(page.locator('[name="userInfo"]')).toBeVisible();
    });
    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "rooter", "wrong*");
      await expect(
        page.getByText("* Invalid username or password.")
      ).toBeVisible();
    });
  });
});
