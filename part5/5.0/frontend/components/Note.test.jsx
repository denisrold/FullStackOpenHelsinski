import {render,screen} from '@testing-library/react';
import NoteContent from'./NoteContent';

test('Render content',()=>{
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }
    render(<NoteContent content={note.content} />)

    const element = screen.getByText('Component testing is done with react-testing-library')
    expect(element).toBeDefined()
})