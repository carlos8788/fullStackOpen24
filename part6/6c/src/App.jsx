
import { useEffect } from 'react'
import Anecdotes from './components/Anecdotes'
import Filter from './components/Filter'
import NewAnecdotes from './components/NewAnecdotes'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { useDispatch} from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAnecdotes = async () => {
      dispatch(setAnecdotes(await anecdoteService.getAll()))
    };
    fetchAnecdotes();
  }, []);
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdotes />
      <h2>create new</h2>
      <NewAnecdotes />
    </div>
  )
}

export default App