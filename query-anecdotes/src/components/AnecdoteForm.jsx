/* eslint-disable react/prop-types */
const AnecdoteForm = ({addAnecdote}) => {
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
