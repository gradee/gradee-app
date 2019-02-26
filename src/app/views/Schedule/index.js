// Dependencies
import React, { Component } from 'react'

// Helpers
import Storage from './../../helpers/storage'
import API from './../../helpers/api'

class Schedule extends Component {
  constructor(props) {
    super(props)

    this.state = {
      schedules: Storage._.settings.schedules,
      activeSchedule: Storage._.settings.schedules[0],
      loadingScheduleData: true
    }

    API.getScheduleByWeek(this.state.activeSchedule).then(data => {
      this.setState({
        loadingScheduleData: false,
        scheduleData: data
      })
    })
  }

  render() {
    return (
      <article className="view" id="schedule">
        <h1>{this.state.activeSchedule.name}</h1>
        {this.state.scheduleData && !this.state.loadingScheduleData ? (
          <div></div>
        ) : (
          <p>Loading schedule data..</p>
        )}
      </article>
    )
  }
}

export default Schedule
