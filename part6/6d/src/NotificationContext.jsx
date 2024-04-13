import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'NEW':
            console.log(action)
            console.log(state)
            console.log(`new anecdote create: ${action.data.content}`)
            return `new anecdote create: ${action.data.content}`
        case 'VOTE':
            return `anecdote '${action.data.content}' voted`
        default:
            return ''
    }
}

const AnecdoteContext = createContext()

export const AnecdoteContextProvider = (props) => {
    const [anecdote, anecdoteDispatch] = useReducer(notificationReducer, '')

    return (
        <AnecdoteContext.Provider value={[anecdote, anecdoteDispatch]}>
            {props.children}
        </AnecdoteContext.Provider>
    )
}

export const useAnecdoteValue = () => {
    const anecdoteAndDispatch = useContext(AnecdoteContext)
    return anecdoteAndDispatch[0]
}

export const useAnecdoteDispatch = () => {
    const anecdoteAndDispatch = useContext(AnecdoteContext)
    return anecdoteAndDispatch[1]
}

export default AnecdoteContext