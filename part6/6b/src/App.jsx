
import Anecdotes from './components/Anecdotes'
import Filter from './components/Filter'
import NewAnecdotes from './components/NewAnecdotes'
import Notification from './components/Notification'


const App = () => {
  
  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <Filter/>
      <Anecdotes/>
      <h2>create new</h2>
      <NewAnecdotes/>
    </div>
  )
}

export default App