import { render, screen  } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import AddForm from "../components/AddForm";

test('AddBlogs Form', async () => {
    const user = userEvent.setup();
    let author = '';
    let title = '';
    let url = '';
    const handleAddBlogs = vi.fn((e) => e.preventDefault());
    const setErrorMessage = vi.fn();
    const setTitle = vi.fn(value => title+=value);
    const setUrl = vi.fn(value => url +=value);
    const setAuthor = vi.fn(value => author+=value);
    
    render(<AddForm url={url} setUrl={setUrl}  author={author} setAuthor={setAuthor} setTitle={setTitle} title={title}  setErrorMessage={setErrorMessage} handleAddBlogs={handleAddBlogs} errorMessage={null} />)
    
    const titleInput = screen.getByPlaceholderText('the blogverse title');
    const authorInput = screen.getByPlaceholderText('Jhon Travis');
    const urlInput = screen.getByPlaceholderText('https://exampleweb.com');
    const addButton = screen.getByRole('button', { name: /add/i });
    await user.type(titleInput, 'new title');
    await user.type(urlInput, 'newurl');
    await user.type(authorInput, 'new author');
    
    await user.click(addButton);
    //Testing first and last letter typed;
    expect(setTitle).toHaveBeenNthCalledWith(1,'n');
    expect(setTitle).toHaveBeenLastCalledWith('e');
    expect(setAuthor).toHaveBeenNthCalledWith(1,'n');
    expect(setAuthor).toHaveBeenLastCalledWith('r');
    expect(setUrl).toHaveBeenLastCalledWith('l');
    expect(setUrl).toHaveBeenNthCalledWith(1,'n');
    //testing finals values:
    expect(url).toEqual('newurl');
    expect(title).toEqual('new title');
    expect(author).toEqual('new author');
    // //called time add button.
    expect(handleAddBlogs).toHaveBeenCalledTimes(1);
})