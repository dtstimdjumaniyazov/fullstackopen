import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

// 5.16
test('<NewBlogForm /> calls createBlog with correct details on submit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<NewBlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const titleInput = inputs[0]
  const authorInput = inputs[1]
  const urlInput = inputs[2]

  await user.type(titleInput, 'Testing with React')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'http://test.com')

  await user.click(screen.getByText('create'))

  console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing with React')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlog.mock.calls[0][0].url).toBe('http://test.com')
})
