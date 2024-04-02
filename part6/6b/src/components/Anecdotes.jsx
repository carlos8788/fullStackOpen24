import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

const Anecdotes = () => {
    const anecdotes = useSelector(state => {
        let arrayAnecdotes = state.anecdotes
        if (state.filter) {
            arrayAnecdotes = arrayAnecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        }
        return arrayAnecdotes.sort((a, b) => a.votes < b.votes)
    })
    const dispatch = useDispatch()
    const vote = (id) => dispatch(addVote(id))
    return (
        <div>{anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>Create</button>
                </div>
            </div>
        )}</div>
    )
}
export default Anecdotes