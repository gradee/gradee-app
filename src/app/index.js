// Dependencies
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Helpers
import Storage from './helpers/storage'

// Views
import Intro from './views/Intro'
import Schedule from './views/Schedule'
import Settings from './views/Settings'

// Components
import Header from './components/Header'
import NavBar from './components/NavBar'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      introSetup: Storage._.hasOwnProperty('settings'),
      settings: Storage._.settings
    }

    Storage.subscribe(this, {
      settings: {
        state: 'introSetup',
        eval: (val) => (typeof val !== 'undefined' && val !== null)
      }
    })
  }

  render() {
    return (
      <section id="app">
        {this.state.introSetup ? (
          <Router>
            <div className="view-wrapper">
              <Header />
              <main role="main">
                <Route exact path="/" component={Schedule} />
                <Route path="/settings" component={Settings} />
              </main>
              <NavBar />
            </div>
          </Router>
        ) : (
          <Intro />
        )}
      </section>
    )
  }
}

export default App
