const loginWith = async (page, username, password) => {
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
};

const newBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "Add Blog" }).click();
  const formContainer = await page.locator(".formAdd");
  await formContainer.locator('input[name="title"]').fill(title);
  await formContainer.locator('input[name="author"]').fill(author);
  await formContainer.locator('input[name="url"]').fill(url);
  await formContainer.getByText("Add").click();
};
export { loginWith, newBlog };
