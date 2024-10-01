import { useDispatch } from 'react-redux'
import  anecdoteService from '../services/anecdote'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    
    console.log('new anecdote content:', content)
    
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew({ content })
    
    dispatch({ type: 'anecdotes/appendAnecdote', payload: newAnecdote })
    dispatch({ type: 'notification/setNotification', payload: { message: "you created a new anecdote" } })
    setTimeout(() => {
      dispatch({ type: 'notification/clearNotification' })
    }, 5000)
  }
  
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name="anecdote" type="text"/></div>
        <button type="submit">add</button>
      </form>
    </>
  )
}

export default AnecdoteForm