import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../components/Form';

test('<Form /> updates parent state and calls onSubmit', async () => {
  const createNote = vi.fn((e) => e.preventDefault());  
  const handleNoteChange = vi.fn();
  const user = userEvent.setup();
  render(<Form addNote={createNote} handleNoteChange={handleNoteChange} value="" />);
  const input = screen.getByRole('textbox');
  const sendButton = screen.getByText('ADD');
  //change value simulation
  await user.type(input, 'testing a form...');
  await user.click(sendButton);
  expect(createNote).toHaveBeenCalledTimes(1);
  expect(input).toHaveValue('testing a form...');
  expect(createNote.mock.calls[0][0].target.elements[0].value).toBe('testing a form...');
});