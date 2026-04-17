import AnecdoteForm from './components/AnecdoteForm'
import { useAnecdotes } from './components/hooks/useAnecdotes'
import Notification from './components/Notification'

const App = () => {
  const { anecdotes, isPending, isError, updateAnecdote } = useAnecdotes()
  
  if (isPending) {
    return <div>loading anecdote service...</div>
  }

  if (isError) {
    return <div>anecdote service is note availabe due to problems in the server</div>
  }

  const handleVote = (anecdote) => {
    updateAnecdote(anecdote)
  }

  

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App