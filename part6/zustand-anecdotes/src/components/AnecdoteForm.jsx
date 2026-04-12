import { useAnecdoteActions } from "../store"
import { useNotificationActions } from '../store'

const AnecdoteForm = () => {
    const { addAnecdote } = useAnecdoteActions()
    const { createNotification } = useNotificationActions()

    const addNewAnecdote = (e) => {
        e.preventDefault()
        const content = e.target.content.value
        addAnecdote(content)
        createNotification(content)
        e.target.reset()
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addNewAnecdote}>
                <div>
                <input name="content"/>
                </div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm