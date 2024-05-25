import { render, screen } from "@testing-library/react";
import Blogs from "../components/Blog";

test("Rendering only title and author.", () => {
    const blog = {
      title: "Test Blog Title",
      author: "Test Author",
      id: "664a5ff0a5166ab392d0c2d4",
      likesUserId: ["663d172df6a2f8f28dd8360f"],
      likes:100,
      userId: {
        name: "Test User",
        id: "663d172df6a2f8f28dd8360f",
        username: "rooter",
      },
      url: "https54544545",
    };
  const { container } = render( <Blogs user={false} blog={blog} />);    
  const authorElement = container.querySelector("#testAuthor");
  expect(screen.getByText("Test Blog Title")).toBeInTheDocument();
  expect(authorElement).toHaveTextContent("Test Author");
  expect(screen.queryByText("https54544545")).not.toBeInTheDocument();
  expect(screen.queryByText(blog.likes)).not.toBeInTheDocument();
});
