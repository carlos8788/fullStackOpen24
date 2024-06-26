import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload.id;
      const index = state.findIndex(anecdote => anecdote.id === id);
      if (index !== -1) {
        state[index].votes += 1;
      }
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})



export const { addVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdotes = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const updateAnecdotes = (id, vote) => {

  return async dispatch => {
    try {
      const obj = { votes: vote + 1 }
      await anecdoteService.updateVote(id, obj)
      dispatch(addVote({ id }))
    } catch (error) {
      console.log(error)
    }

  }
}

export default anecdoteSlice.reducer