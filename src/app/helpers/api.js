function API() {
  let apiBaseUrl = 'https://data.gradee.io'

  function getSchools() {
    return new Promise((resolve, reject) => {
      if (!navigator.onLine) return reject('No internet connection')

      // Fetch School list from API.
      fetch(`${apiBaseUrl}/schools`)
        .then(res => resolve(res.json()))
      .catch(error => reject(error))
    })
  }

  function getSchoolData(schoolSlug) {
    return new Promise((resolve, reject) => {
      if (!navigator.onLine) return reject('No internet connection')

      // Fetch School data from API.
      fetch(`${apiBaseUrl}/schools/${schoolSlug}`)
        .then(res => resolve(res.json()))
      .catch(error => reject(error))
    })
  }

  function getTypeData(schoolSlug, typeSlug) {
    return new Promise((resolve, reject) => {
      if (!navigator.onLine) return reject('No internet connection')

      fetch(`${apiBaseUrl}/schools/${schoolSlug}/${typeSlug}`)
        .then(res => resolve(res.json()))
      .catch(error => reject(error))
    })
  }

  function getScheduleData(schoolSlug, typeSlug, scheduleId) {
    return new Promise((resolve, reject) => {
      if (!navigator.onLine) return reject('No internet connection')

      fetch(`${apiBaseUrl}/schools/${schoolSlug}/${typeSlug}/${scheduleId}`)
        .then(res => resolve(res.json()))
      .catch(error => reject(error))
    })
  }

  function getScheduleByWeek(schedule, weekNum) {
    return new Promise((resolve, reject) => {
      if (!navigator.onLine) return reject('No internet connection')

      fetch(`${apiBaseUrl}/schools/${schedule.school}/${schedule.type}/${schedule.id}/schedule`)
        .then(res => resolve(res.json()))
      .catch(error => reject(error))
    })
  }

  return {
    getSchools,
    getSchoolData,
    getTypeData,
    getScheduleData,
    getScheduleByWeek
  }
}

export default API()
