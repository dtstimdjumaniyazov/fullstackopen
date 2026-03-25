import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: { name: 'Test User' }
}

// 5.13
test('renders title and author, but not url or likes by default', () => {
  render(<Blog blog={blog} addLike={() => {}} remove={() => {}} />)

  expect(screen.getByText(/React patterns/)).toBeDefined()
  expect(screen.getByText(/Michael Chan/)).toBeDefined()

  expect(screen.queryByText('https://reactpatterns.com/')).toBeNull()
  expect(screen.queryByText(/likes 7/)).toBeNull()
})

// 5.14
test('url and likes are shown when the view button is clicked', async () => {
  const user = userEvent.setup()
  render(<Blog blog={blog} addLike={() => {}} remove={() => {}} />)

  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText('https://reactpatterns.com/')).toBeDefined()
  expect(screen.getByText(/likes 7/)).toBeDefined()
})

// 5.15
test('like button clicked twice calls the event handler twice', async () => {
  const mockAddLike = vi.fn()
  const user = userEvent.setup()
  render(<Blog blog={blog} addLike={mockAddLike} remove={() => {}} />)

  await user.click(screen.getByText('view'))

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockAddLike.mock.calls).toHaveLength(2)
})
