import {Component} from 'react'
import MovieSearch from './components/MovieSearch'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.
// Replace your code here
class App extends Component {
  render() {
    return (
      <div>
        <MovieSearch />
      </div>
    )
  }
}

export default App
