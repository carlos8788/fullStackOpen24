
import Anecdotes from './components/Anecdotes'
import Filter from './components/Filter'
import NewAnecdotes from './components/NewAnecdotes'


const App = () => {
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <Anecdotes/>
      <h2>create new</h2>
      <NewAnecdotes/>
    </div>
  )
}

export default App