import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Movies from './pages/Movies'
import Movie from './pages/Movie'
import Search from './pages/Search'
import NoMatch from './pages/NoMatch'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/movies/:id" component={Movie} />
        <Route exact path="/search" component={Search} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default App
