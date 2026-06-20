import { useState, useEffect } from "react"
import anecdoteService from '../services/anecdotes'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }
    
    const reset = () => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        reset
    }
}

export const useAnecdotes = (anecdote) => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(() => {
        anecdoteService.getAll().then(data => setAnecdotes(data))
    }, [])

    const addAnecdote = (anecdote) => {
        anecdoteService.createNew({ ...anecdote})
        setAnecdotes(anecdotes.concat({...anecdote}))
    }

    const removeAnecdote = (id) => {
        anecdoteService.removeAnecdote(id)
        setAnecdotes(anecdotes.filter(anecdote => anecdote.id !== id))
    }

    return { anecdotes, addAnecdote, removeAnecdote }
}