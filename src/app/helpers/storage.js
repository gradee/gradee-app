function Storage() {
  const _saveKey = 'gradee_app_data'
  let _ = localStorage.getItem(_saveKey) ? JSON.parse(localStorage.getItem(_saveKey)) : {}

  const subscriptions = {}

  function subscribe(component, params) {
    // Make sure the params are of the type Object.
    if (typeof params !== 'object') return new Error('2nd parameter must be of the type Object')

    // Go through each store key to set up subscriptions to it's value change.
    Object.keys(params).map(key => {
      // Make sure the store key has it's own list to start with.
      if (!subscriptions.hasOwnProperty(key)) subscriptions[key] = []

      // Check if there are multiple subscriptions to the same store key. (Array)
      if (Array.isArray(params[key])) {
        params[key].map(sub => {
          // If the value is of the type String, it's a key reference to the state key.
          // Convert it into an Object and store the key as `state`.
          if (typeof sub === 'string') {
            sub = { state: sub }
          }

          // Add the desired component to the subscription for easy reference.
          sub.component = component

          // Add the new subscription to the list for the specific store key.
          subscriptions[key].push(sub)
        })
      } else {
        // If the value is of the type String, it's a key reference to the state key.
        // Convert it into an Object and store the key as `state`.
        if (typeof params[key] === 'string') {
          params[key] = { state: params[key] }
        }

        // Add the desired component to the subscription for easy reference.
        params[key].component = component

        // Add the new subscription to the list for the specific store key.
        subscriptions[key].push(params[key])
      }
    })
  }

  function updateSubscriptions(key) {
    subscriptions[key].map(sub => {
      const state = {}

      // Check for 'eval' key to set value based on a certain evaluation.
      // Otherwise simply set it to the new value.
      if (sub.hasOwnProperty('eval')) {
        // Evaluate the value of the store key through a given eval function.
        state[sub.state] = sub.eval(_[key])
      } else {
        // Simply mimic the value of the store key and set it to the component state.
        state[sub.state] = _[key]
      }

      sub.component.setState(state) // Update the actual state.
    })
  }

  function set(changeObj) {
    Object.keys(changeObj).map(key => {
      if (key) {
        _[key] = changeObj[key]
        if (subscriptions.hasOwnProperty(key)) updateSubscriptions(key)
      }
    })
    localStorage.setItem(_saveKey, JSON.stringify(_))
  }

  return { _, set, subscribe }
}

export default Storage()
