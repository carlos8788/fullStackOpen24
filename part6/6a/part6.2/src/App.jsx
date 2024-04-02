
import Anecdotes from './components/Anecdotes'
import NewAnecdotes from './components/NewAnecdotes'


const App = () => {
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes/>
      <h2>create new</h2>
      <NewAnecdotes/>
    </div>
  )
}

export default App