const { describe, test, expect } = require("@playwright/test");

describe("Note app", () => {
  test("front page can be opened", async ({ page }) => {
    await page.goto("http://localhost:5173");

    const locator = await page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Helsinki 2024"
      )
    ).toBeVisible();
  });

  test("can be login", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("textbox").first().fill("rooter");
    await page.getByRole("textbox").last().fill("Password123*");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("toor logged in")).toBeVisible();
  });
});
