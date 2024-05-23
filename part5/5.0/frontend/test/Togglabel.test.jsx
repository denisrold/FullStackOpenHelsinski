import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggable from '../components/Togglable';

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Toggable buttonLabel="show...">
        <div className="testDiv" >
          togglable content
        </div>
      </Toggable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('at start the children are displayed', () => {
    const div = container.querySelector('.testDiv');
    expect(div).toHaveStyle('display: block');
  })

  test('after clicking the button, children not displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)
    const div = container.querySelector('.testDiv')
    expect(div).not.toHaveStyle('display: none')
  })

})