export const Anecdote = ({ anecdote }) => {
    console.log(anecdote)
    return (
        <div>
            <h1>{anecdote.content}</h1>
            <h3>Has {anecdote.votes} votes</h3>
        </div>
    )
}