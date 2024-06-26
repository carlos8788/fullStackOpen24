import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdotes = () => {
    const anecdotes = useSelector(state => {
        let arrayAnecdotes = state.anecdotes
        if (state.filter) {
            arrayAnecdotes = arrayAnecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        }
        return arrayAnecdotes
    })

    const dispatch = useDispatch()
    const vote = (id, content) => {
        dispatch(addVote({ id }))
        dispatch(setNotification(`you voted '${content}'`))
        setTimeout(()=> dispatch(setNotification('')), 3000)
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
                            <button onClick={() => vote(anecdote.id, anecdote.content)}>Add vote</button>
                        </div>
                    </div>
            )}</div>
    )
}
export default Anecdotes