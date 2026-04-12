import { useAnecdotes, useAnecdoteActions } from "../store"
import { useNotificationActions } from '../store'

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { addVotes, deleteAnecdote } = useAnecdoteActions()
    const { addVoteNotification } = useNotificationActions()


    // console.log(anecdotes)

    const sortedAnecdotes = anecdotes.toSorted((a, b) => {
        return (b.votes - a.votes)
    })

    return (
        <div>
            {sortedAnecdotes?.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button 
                            onClick={() => { 
                                addVotes(anecdote.id)
                                addVoteNotification(anecdote.content)
                            }}
                        >
                            vote
                        </button>
                        {anecdote.votes === 0 && 
                            <button
                                onClick={() => deleteAnecdote(anecdote.id)}
                            >
                                delete
                            </button>
                        }
                    </div>

                </div>
            ))}
        </div>
    )
}

export default AnecdoteList