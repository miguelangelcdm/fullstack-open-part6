import { createSlice } from '@reduxjs/toolkit'
import anedocteService from '../services/anecdote'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voting: (state, action) => {
      const id = action.payload.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { voting, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anedocteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anedocteService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await anedocteService.vote(id)
    dispatch(voting({ id: anecdote.id }))
  }
}

export default anecdoteSlice.reducer