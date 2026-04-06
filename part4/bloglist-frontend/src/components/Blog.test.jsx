import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import BlogDetails from './BlogDetails'

const blog = {
  id: '123',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: { id: 'user1', name: 'Test User' }
}

const renderBlogDetails = (user = null) => {
  return render(
    <MemoryRouter initialEntries={['/blogs/123']}>
      <Routes>
        <Route path='/blogs/:id' element={
          <BlogDetails blogs={[blog]} addLike={() => {}} remove={() => {}} user={user} />
        } />
      </Routes>
    </MemoryRouter>
  )
}

// 5.28 - unauthenticated users see blog info but no buttons
test('blog info and likes shown to unauthenticated users, no buttons displayed', () => {
  renderBlogDetails(null)

  expect(screen.getByText(/React patterns/)).toBeDefined()
  expect(screen.getByText('https://reactpatterns.com/')).toBeDefined()
  expect(screen.getByText(/7\s*likes/)).toBeDefined()

  expect(screen.queryByText('like')).toBeNull()
  expect(screen.queryByText('remove')).toBeNull()
})

// 5.28 - authenticated non-creator sees like button only
test('authenticated non-creator sees like button but not remove button', () => {
  const otherUser = { id: 'user2', name: 'Other User' }
  renderBlogDetails(otherUser)

  expect(screen.getByText('like')).toBeDefined()
  expect(screen.queryByText('remove')).toBeNull()
})

// 5.28 - creator sees both like and remove buttons
test('blog creator sees both like and remove buttons', () => {
  const creator = { id: 'user1', name: 'Test User' }
  renderBlogDetails(creator)

  expect(screen.getByText('like')).toBeDefined()
  expect(screen.getByText('remove')).toBeDefined()
})
