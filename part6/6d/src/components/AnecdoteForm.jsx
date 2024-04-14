import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../api/requests";
import { useAnecdoteDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useAnecdoteDispatch()
  const newAnecdoteMutation = useMutation({
    mutationFn: (anecdote) => {
      if (anecdote.content.length < 5) {
        return Promise.reject(new Error('El contenido debe tener al menos 5 caracteres'));
      }
      return createAnecdote(anecdote);
    },
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])

      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({ type: 'NEW', data: newAnecdote })

    },
    onError: () => dispatch({ type: 'ERROR' })
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')

    newAnecdoteMutation.mutate({ content, votes: 0 })

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
