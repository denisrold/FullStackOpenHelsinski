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
  test("user can loggin", async ({ page }) => {
    await loginWith(page, "rooter", "Password123*");
    await expect(page.getByText("logged in")).toBeVisible();
  });
});
