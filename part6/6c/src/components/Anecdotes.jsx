import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdotes } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

const Anecdotes = () => {
    const anecdotes = useSelector(state => {
        let arrayAnecdotes = state.anecdotes
        if (state.filter) {
            arrayAnecdotes = arrayAnecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        }
        return arrayAnecdotes
    })

    const dispatch = useDispatch()
    const vote = (anecdote) => {
        dispatch(updateAnecdotes(anecdote.id, anecdote.votes))
        dispatch(notification(`you voted '${anecdote.content}'`, 3))
    };
    return (
        <div>{[...anecdotes]
            .sort((a, b) => a.votes < b.votes)
            .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>Add vote</button>
                    </div>
                </div>
            )}</div>
    )
}
export default Anecdotes