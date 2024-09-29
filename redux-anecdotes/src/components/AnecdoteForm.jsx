import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log('new anecdote content:', content)
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
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