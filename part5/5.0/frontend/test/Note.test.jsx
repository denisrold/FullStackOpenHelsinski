import {render,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import NoteContent from'../components/NoteContent';
import Note from '../components/Notes';

test('Render content',() => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }
    render(<NoteContent content={note.content} />)
    //debugger
    screen.debug();

    const element = screen.getByText('Component testing is done with react-testing-library')

    screen.debug(element);
    // expect(element).toBeDefined()
})


test('Render content container',() => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }
   const {container} =  render(<NoteContent content={note.content} />)
   const div = container.querySelector('.note');

   expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('Render content button', async () => {
    const mockHandler = vi.fn()
    //debugger
    const user = userEvent.setup()
    const {container} =  render(<Note toggleImportance={mockHandler}/>)

    const button = container.querySelector('#testID');
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
})