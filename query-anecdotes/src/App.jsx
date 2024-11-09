import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      // queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const updateAnecdoteMutation = useMutation({ 
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  
  if (result.error) {
    return <div>anecdote service not available due to problems in the server</div>
  }
  
  if (result.isLoading) {
    return <div>Loading...</div>
  }
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(
      { content, votes: 0 },
      { 
        onSuccess: (newAnecdote) => {
          notificationDispatch({ type: 'add', payload: `new anecdote "${newAnecdote.content}" added` })
        },
        onError: (error) => {
          notificationDispatch({ type: 'add', payload: `too short anecdote, must have length 5 or more` })
        }
      }
    )
  }
  
  const handleVote = async (anecdote) => {
    const newVotes = anecdote.votes + 1
    updateAnecdoteMutation.mutate(
      { ...anecdote, votes: newVotes },
      { onSuccess: (updatedAnecdote) => {
        notificationDispatch({ type: 'add', payload: `anecdote "${updatedAnecdote.content}" voted` })
      }}
    )
  }
  
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote} />
      
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
