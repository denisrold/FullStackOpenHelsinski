import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Blogs from "../components/Blog";

describe('Blogs Components views', ()=>{
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

  test('Rendering url in Togglabel components on click', async () => {
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

  const user = userEvent.setup();
  const { container } = render( <Blogs user={false} blog={blog} />);    
  screen.debug(container);
  const showButton = screen.getByText('show');
  await user.click(showButton);
  expect(container).toHaveTextContent("Test User");
  expect(container).toHaveTextContent("https54544545");
  screen.debug(container);
  expect(screen.getByText(/Test User/i)).toHaveStyle('display: block');
  expect(screen.getByText(/https54544545/i)).toHaveStyle('display: block');
  })

  
})
