import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Movie from './pages/Movie'
import NoMatch from './pages/NoMatch'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movies" component={Home} />
        <Route exact path="/movies/:id" component={Movie} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default App
