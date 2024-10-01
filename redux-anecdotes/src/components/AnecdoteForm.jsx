import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log('new anecdote content:', content)
    event.target.anecdote.value = ''
    dispatch({ type: 'anecdotes/addAnecdote', payload: { content } })
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