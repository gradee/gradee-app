import Storage from './storage'

function API() {
  let apiBaseUrl = 'https://data.gradee.io'

  function getSchools() {
    return new Promise((resolve, reject) => {
      // Check cache, and return cached data if it exists.
      const cachedSchools = Storage.cache.get('schoolList')
      if (cachedSchools) return resolve(cachedSchools)

      // Check online connection if you want to fetch directly from the API.
      if (!navigator.onLine) return reject('No internet connection')
      
      // Fetch School list from API.
      fetch(apiBaseUrl + '/schools')
        .then(res => res.json())
        .then(schoolList => {
          Storage.cache.set('schoolList', schoolList)
          resolve(schoolList)
        })
      .catch(error => reject(error))
    })
  }

  function getSchoolData(schoolSlug) {
    return new Promise((resolve, reject) => {
      // Check cache, and return cached data if it exists.
      let schoolDataStore = Storage.cache.get('schoolData')
      if (!schoolDataStore) {
        schoolDataStore = {}
      } else if (schoolDataStore.hasOwnProperty(schoolSlug)) {
        return resolve(schoolDataStore[schoolSlug])
      }

      // Check online connection if you want to fetch directly from the API.
      if (!navigator.onLine) return reject('No internet connection')
      
      // Fetch School data from API.
      fetch(apiBaseUrl + '/schools/' + schoolSlug)
        .then(res => res.json())
        .then(schoolData => {
          schoolDataStore[schoolSlug] = schoolData
          Storage.cache.set('schoolData', schoolDataStore)

          resolve(schoolData)
        })
      .catch(error => reject(error))
    })
  }

  function getTypeData(schoolSlug, typeSlug) {
    return new Promise((resolve, reject) => {
      // Check cache, and return cached data if it exists.
      let schoolDataStore = Storage.cache.get('schoolData')
      if (!schoolDataStore[schoolSlug].hasOwnProperty('scheduleList')) {
        schoolDataStore[schoolSlug].scheduleList = {}
      } else if (schoolDataStore[schoolSlug].scheduleList.hasOwnProperty(typeSlug)) {
        return resolve(schoolDataStore[schoolSlug].scheduleList[typeSlug])
      }
      
      if (!navigator.onLine) return reject('No internet connection')
      
      fetch(apiBaseUrl + '/schools/' + schoolSlug + '/' + typeSlug)
        .then(res => res.json())
        .then(typeData => {
          schoolDataStore[schoolSlug].scheduleList[typeSlug] = typeData
          Storage.cache.set('schoolData', schoolDataStore)

          resolve(typeData)
        })
      .catch(error => reject(error))
    })
  }

  return {
    getSchools,
    getSchoolData,
    getTypeData
  }
}

export default API()