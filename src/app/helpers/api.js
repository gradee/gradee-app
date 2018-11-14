function API() {
  let apiBaseUrl = 'https://api.gradee.io'

  function getSchools() {
    return new Promise((resolve, reject) => {
      if (!navigator.onLine) return reject('No internet connection')
    
      fetch(apiBaseUrl + '/schools')
        .then(res => resolve(res.json()))
      .catch(error => reject(error))
    })
  }

  function getSchoolData(schoolSlug) {
    return new Promise((resolve, reject) => {
      if (!navigator.onLine) return reject('No internet connection')
      
      fetch(apiBaseUrl + '/schools/' + schoolSlug)
        .then(res => resolve(res.json()))
      .catch(error => reject(error))
    })
  }

  function getTypeData(schoolSlug, typeSlug) {
    return new Promise((resolve, reject) => {
      if (!navigator.onLine) return reject('No internet connection')
      
      fetch(apiBaseUrl + '/schools/' + schoolSlug + '/' + typeSlug)
        .then(res => resolve(res.json()))
      .catch(error => reject(error))
    })
  }

  return {
    getSchools,
    getSchoolData,
    getTypeData
  }
}

module.exports = API()