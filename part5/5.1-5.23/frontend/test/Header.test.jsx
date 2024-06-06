import { render, screen } from '@testing-library/react'
import Header from '../components/Headers'

test('renders content', () => {

  render(<Header />)
  const element = screen.getByText('Bloggerse')
  expect(element).toBeDefined()
})