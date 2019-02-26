function Storage() {
  const saveKey = 'gradee_app_data'
  let _ = localStorage.getItem(saveKey) ? JSON.parse(localStorage.getItem(saveKey)) : {}

  function set(changeObj) {
    Object.keys(changeObj).map(key => {
      _[key] = changeObj[key]
    })
    localStorage.setItem('gradee_app_data', JSON.stringify(_))
  }

  return { _, set }
}

export default Storage()
