import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useAnecdoteStore, useNotificationStore } from '../store'
import AnecdoteList from '../components/AnecdoteList'
import anecdoteService from '../services/anecdotes'

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    deleteAnecdote: vi.fn(),
  },
}))

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  useNotificationStore.setState({ message: '' })
  vi.clearAllMocks()
})

// Ex 6.12
describe('store initialization', () => {
  it('initializes state with anecdotes from backend', async () => {
    const anecdotes = [
      { id: '1', content: 'If it hurts, do it more often', votes: 0 },
      { id: '2', content: 'Adding manpower to a late project makes it later', votes: 3 },
    ]
    anecdoteService.getAll.mockResolvedValue(anecdotes)

    await act(async () => {
      await useAnecdoteStore.getState().actions.initialize()
    })

    expect(useAnecdoteStore.getState().anecdotes).toEqual(anecdotes)
  })
})

// Ex 6.13
describe('anecdotes sorted by votes', () => {
  it('displays anecdotes in descending vote order', () => {
    const anecdotes = [
      { id: '1', content: 'least votes', votes: 1 },
      { id: '2', content: 'most votes', votes: 10 },
      { id: '3', content: 'no votes', votes: 0 },
    ]
    useAnecdoteStore.setState({ anecdotes, filter: '' })

    const { container } = render(<AnecdoteList />)

    const items = Array.from(container.querySelector('div').children)
    const orderedContents = items.map(el => el.querySelector('div').textContent)

    expect(orderedContents).toEqual(['most votes', 'least votes', 'no votes'])
  })
})

// Ex. 6.14
describe('anecdote filtering', () => {
  it('shows only anecdotes matching the filter', () => {
    const anecdotes = [
      { id: '1', content: 'react is good', votes: 0 },
      { id: '2', content: 'vue is also good', votes: 0 },
      { id: '3', content: 'angular is okay', votes: 0 },
    ]
    useAnecdoteStore.setState({ anecdotes, filter: 'react' })

    const { container } = render(<AnecdoteList />)

    const items = Array.from(container.querySelector('div').children)
    expect(items).toHaveLength(1)
    expect(items[0].querySelector('div').textContent).toBe('react is good')
  })
})

// Ex.6.15
describe('voting', () => {
  it('increases the number of votes when vote button is clicked', async () => {
    const anecdote = { id: '1', content: 'test anecdote', votes: 0 }
    anecdoteService.update.mockResolvedValue({ ...anecdote, votes: 1 })
    useAnecdoteStore.setState({ anecdotes: [anecdote], filter: '' })

    render(<AnecdoteList />)

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'vote' }))

    expect(useAnecdoteStore.getState().anecdotes[0].votes).toBe(1)
  })
})
