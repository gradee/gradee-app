// Dependencies
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Helpers
import Storage from './../../helpers/storage'

class Settings extends Component {

  constructor(props) {
    super(props)

    this.resetAppSettings = this.resetAppSettings.bind(this)
  }

  resetAppSettings() {
    if (!confirm('Are you sure you want to reset the app?')) return

    Storage.set({ settings: undefined })
    this.props.history.push('/')
  }

  render() {
    return (
      <article className="view" id="settings">
        <button onClick={this.resetAppSettings}>Reset app</button>
      </article>
    )
  }
}

export default withRouter(Settings)
