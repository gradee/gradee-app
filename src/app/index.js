import React, { Component } from 'react'

import API from './helpers/api'
import Storage from './helpers/storage'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      didSelectSchool: false,
      schools: [],
      types: [],
      schedules: [],
      schoolSlug: '',
      typeSlug: ''
    }

    this.schoolChange = this.schoolChange.bind(this)
    this.typeChange = this.typeChange.bind(this)
  }

  componentWillMount() {
    API.getSchools().then(schools => {
      this.setState({
        schools: schools
      })
    })
  }

  schoolChange(e) {
    const slug = e.target.value
    if (slug !== '0') {
      API.getSchoolData(slug).then(data => {
        this.setState({
          schoolSlug: slug,
          types: data.types
        })
      })
    }
  }

  typeChange(e) {
    const slug = e.target.value
    if (slug !== '0') {
      API.getTypeData(this.state.schoolSlug, slug).then(data => {
        this.setState({
          typeSlug: slug,
          schedules: data
        })
      })
    }
  }

  render() {
    return (
      <div>
        <select onChange={this.schoolChange}>
          <option value="0">Välj din skola..</option>
          {this.state.schools.map((school, i) => {
            return (
              <option value={school.slug} key={i}>{school.name}</option>
            )
          })}
        </select>

        <select onChange={this.typeChange}>
          <option value="0">Välj schematyp..</option>
          {this.state.types.map((type, i) => {
            return (
              <option value={type.slug} key={i}>{type.name}</option>
            )
          })}
        </select>

        <select>
          <option value='0'>Välj ditt schema..</option>
          {this.state.schedules.map((schedule, i) => {
            return (
              <option value={schedule.id} key={i}>{schedule.name}</option>
            )
          })}
        </select>
      </div>
    )
  }
}

export default App