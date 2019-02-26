import React, { Component } from 'react'

class Settings extends Component {

  constructor(props) {
    super(props)

    this.resetAppSettings = this.resetAppSettings.bind(this)
  }

  resetAppSettings() {
    if (!confirm('Are you sure you want to reset the app?')) return

    console.log('Reset app.')
  }

  render() {
    return (
      <article className="view" id="settings">
        <button onClick={this.resetAppSettings}>Reset app</button>
      </article>
    )
  }
}

export default Settings
