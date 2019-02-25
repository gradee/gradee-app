import React, { Component } from 'react'

import API from './helpers/api'
import Storage from './helpers/storage'

import Header from './components/header'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      schools: [],
      types: [],
      schedules: [],
      selectedSchoolSlug: '',
      selectedTypeSlug: ''
    }

    this.schoolChange = this.schoolChange.bind(this)
    this.typeChange = this.typeChange.bind(this)
    this.scheduleChange = this.scheduleChange.bind(this)

    this.introCache = Storage.cache.get('intro')
    if (!this.introCache) {
      this.introCache = {}
    }
  }

  setSelectValue(node, value) {
    const ev = new Event('change', { bubbles: true} )
    ev.simulated = true
    node.value = value
    node.dispatchEvent(ev)
  }

  componentWillMount() {
    API.getSchools().then(schools => {
      this.setState({
        schools: schools
      })

      if (this.introCache.hasOwnProperty('school')) {
        this.setSelectValue(this._schoolSelectNode, this.introCache.school)
      }
    })
  }

  schoolChange(e) {
    const schoolSlug = e.target.value
    if (schoolSlug !== '0') {
      this.introCache.school = schoolSlug
      Storage.cache.set('intro', this.introCache)

      API.getSchoolData(schoolSlug).then(data => {
        this.setState({
          selectedSchoolSlug: schoolSlug,
          types: data.types
        })

        if (this.introCache.hasOwnProperty('type')) {
          this.setSelectValue(this._typeSelectNode, this.introCache.type)
        }
      })
    }
  }

  typeChange(e) {
    const typeSlug = e.target.value
    if (typeSlug !== '0') {
      this.introCache.type = typeSlug
      Storage.cache.set('intro', this.introCache)

      API.getTypeData(this.state.selectedSchoolSlug, typeSlug).then(data => {
        this.setState({
          selectedTypeSlug: typeSlug,
          schedules: data
        })

        if (this.introCache.hasOwnProperty('schedule')) {
          this.setSelectValue(this._scheduleSelectNode, this.introCache.schedule)
        }
      })
    }
  }

  scheduleChange(e) {
    const scheduleId = e.target.value
    if (scheduleId !== '0') {
      this.introCache.schedule = scheduleId
      Storage.cache.set('intro', this.introCache)
    }
  }

  render() {
    return (
      <section id="app">
        <Header />

        <select onChange={this.schoolChange} ref={ s => (this._schoolSelectNode = s) }>
          <option value="0">Välj din skola..</option>
          {this.state.schools.map((school, i) => {
            return (
              <option value={school.slug} key={i}>{school.name}</option>
            )
          })}
        </select>

        {this.state.selectedSchoolSlug !== '' &&
          <select onChange={this.typeChange} ref={ s => (this._typeSelectNode = s) }>
            <option value="0">Välj schematyp..</option>
            {this.state.types.map((type, i) => {
              return (
                <option value={type.slug} key={i}>{type.name}</option>
              )
            })}
          </select>
        }

        {this.state.selectedTypeSlug &&
        <select onChange={this.scheduleChange} ref={ s => (this._scheduleSelectNode = s) }>
          <option value='0'>Välj ditt schema..</option>
          {this.state.schedules.map((schedule, i) => {
            return (
              <option value={schedule.id} key={i}>{schedule.name}</option>
            )
          })}
        </select>
        }
      </section>
    )
  }
}

export default App