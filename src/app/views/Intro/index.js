import React, { Component } from 'react'

import API from './../../helpers/api'
import Storage from './../../helpers/storage'

class Intro extends Component {
  constructor(props) {
    super(props)

    this.schoolChange = this.schoolChange.bind(this)
    this.typeChange = this.typeChange.bind(this)
    this.scheduleChange = this.scheduleChange.bind(this)
    this.changeScheduleName = this.changeScheduleName.bind(this)
    this.saveIntro = this.saveIntro.bind(this)

    this.state = Storage._.introState || {
      schools: [],
      types: [],
      schedules: [],
      schoolSlug: '',
      typeSlug: '',
      scheduleId: '',
      scheduleName: ''
    }
  }

  componentWillMount() {
    if (!this.state.schools.length) {
      API.getSchools().then(schools => {
        this.setState({ schools: schools })
        Storage.set({'introState': this.state})
      })
    }
  }

  schoolChange(e) {
    const schoolSlug = e.target.value
    this.setState({ schoolSlug: schoolSlug })
    if (schoolSlug !== '0') {
      // Load the school data from the API and save to the localStorage cache.
      API.getSchoolData(schoolSlug).then(data => {
        this.setState({ types: data.types })
        Storage.set({ introState: this.state })
      })
    }
  }

  typeChange(e) {
    const typeSlug = e.target.value
    if (typeSlug !== '0') {
      this.setState({ typeSlug: typeSlug })
      API.getTypeData(this.state.schoolSlug, typeSlug).then(data => {
        this.setState({ schedules: data })
        Storage.set({ introState: this.state })
      })
    }
  }

  scheduleChange(e) {
    const scheduleId = e.target.value
    if (scheduleId !== '0') {
      this.setState({ scheduleId: scheduleId, scheduleName: '' })
      API.getScheduleData(this.state.schoolSlug, this.state.typeSlug, scheduleId).then(data => {
        let scheduleName = data.firstName || data.name
        const firstChar = scheduleName.substr(scheduleName.length - 1, 1)
        if (firstChar.toLowerCase() !== 's') scheduleName += 's'
        scheduleName += ' schema'

        this.setState({ scheduleName: scheduleName })
        Storage.set({ introState: this.state })
      })
    }
  }

  changeScheduleName(e) {
    this.setState({ scheduleName: e.target.value })
    Storage.set({ introState: this.state })
  }

  saveIntro() {
    Storage.set({
      settings: {
        schedules: [{
          school: this.state.schoolSlug,
          type: this.state.typeSlug,
          id: this.state.scheduleId,
          name: this.state.scheduleName
        }]
      },
      introState: undefined
    })

    this.setState({
      schools: [],
      types: [],
      schedules: [],
      schoolSlug: '',
      typeSlug: '',
      scheduleId: '',
      scheduleName: ''
    })
  }

  render() {
    return (
      <article id="intro-view">
        <select onChange={this.schoolChange} ref={ s => (this._schoolSelectNode = s) } value={this.state.schoolSlug}>
          <option value="0">Välj din skola..</option>
          {this.state.schools.map((school, i) => {
            return (
              <option value={school.slug} key={i}>{school.name}</option>
            )
          })}
        </select>

        {this.state.schoolSlug !== '' &&
          <select onChange={this.typeChange} ref={ s => (this._typeSelectNode = s) } value={this.state.typeSlug}>
            <option value="0">Välj schematyp..</option>
            {this.state.types.map((type, i) => {
              return (
                <option value={type.slug} key={i}>{type.name}</option>
              )
            })}
          </select>
        }

        {this.state.typeSlug &&
          <select onChange={this.scheduleChange} ref={ s => (this._scheduleSelectNode = s) } value={this.state.scheduleId}>
            <option value='0'>Välj ditt schema..</option>
            {this.state.schedules.map((schedule, i) => {
              return (
                <option value={schedule.id} key={i}>{schedule.name}</option>
              )
            })}
          </select>
        }

        {this.state.scheduleId && this.state.scheduleName &&
          <div>
            <input value={this.state.scheduleName} onChange={this.changeScheduleName}/>
            <button onClick={this.saveIntro}>Get started!</button>
          </div>
        }
      </article>
    )
  }
}

export default Intro
