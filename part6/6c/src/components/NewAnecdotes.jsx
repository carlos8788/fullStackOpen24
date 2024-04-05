import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import anecdoteService from '../services/anecdotes'

const NewAnecdotes = () => {

  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(newAnecdote)
    dispatch(createAnecdote(newAnecdote))
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  )
}
export default NewAnecdotes