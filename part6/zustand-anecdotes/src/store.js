import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = anecdote => ({
//   content: anecdote,
//   id: getId(),
//   votes: 0
// })

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    addVotes: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const updated = await anecdoteService.update(
        id, { ...anecdote, votes: (anecdote.votes + 1) }
      )
      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? updated : a)
      }))
    },
    addAnecdote: async (content) => {
      const newAnecdote = await anecdoteService.create(content)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    deleteAnecdote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      await anecdoteService.deleteAnecdote(
        id, { ...anecdote}
      )
      set(state => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
    },
    setFilter: value => set(() => ({filter: value})),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  if (filter) {
    return anecdotes.filter(a => {
      return a.content.toLowerCase().includes(filter.toLowerCase())
    })
  }
  return anecdotes
}

const useNotificationStore = create((set) => ({
  message: '',
  actions: {
    createNotification: (content, duration = 5000) => {
      set({ message: `Anecdote "${content}" successfully created!`})

      setTimeout(() => {
        set({ message: '' })
      }, duration)
    },
    addVoteNotification: (content, duration = 5000) => {
      set({ message: `You voted "${content}"`})

      setTimeout(() => {
        set({ message: '' })
      }, duration)
    },
  }
}))

export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useNotificationMessage = () => useNotificationStore((state) => state.message)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)