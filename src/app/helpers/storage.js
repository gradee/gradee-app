function Storage() {
  let store = localStorage.getItem('GradeeAppData') ? JSON.parse(localStorage.getItem('GradeeAppData')) : {}
  if (!store.cache) store.cache = {}

  function saveData() {
    localStorage.setItem('GradeeAppData', JSON.stringify(store))
  }

  const cache = {
    get: (key) => {
      if (!store.cache.hasOwnProperty(key)) return null
      
      return JSON.parse(JSON.stringify(store.cache[key]))
    },

    set: (key, value) => {
      let didUpdate = false
      if (!store.cache.hasOwnProperty(key) || JSON.stringify(store.cache[key]) !== JSON.stringify(value)) {
        didUpdate = true
        store.cache[key] = value
        saveData()
      }
      return didUpdate
    },

    clear: () => {
      store.cache = {}
      saveData()
    }
  }

  return {
    cache
  }
}

module.exports = Storage()