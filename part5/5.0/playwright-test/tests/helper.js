const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("textbox").first().fill(username);
  await page.getByRole("textbox").last().fill(password);
  await page.getByRole("button", { name: "Login" }).click();
};

const createNote = async (page, content) => {
  await page.getByRole("button", { name: "Create Notes" }).click();
  await page.getByRole("textbox").fill(content);
  await page.getByRole("button", { name: "ADD" }).click();
};

export { loginWith, createNote };
