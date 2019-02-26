// Dependencies
import React, { Component } from 'react'

// Helpers
import Storage from './../../helpers/storage'
import API from './../../helpers/api'

class Schedule extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let schedule = Storage._.settings.schedules[0]
    console.log(schedule)

    API.getScheduleByWeek(schedule).then(data => {
      console.log(data)
    })
  }

  render() {
    return (
      <div>Schedule</div>
    )
  }
}

export default Schedule
