import { useSelector, useDispatch } from "react-redux"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  console.log("anecdotes", anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    // console.log("vote", id)
    dispatch({ type: 'anecdotes/voting', payload: { id } })
  }
  
  return (
    <>
      {[...anecdotes]
        .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList
