const axios = require('axios')

export const login = async (email, password) => {
  try {
    const res = await axios.post('/login', {
      email,
      password
    })
    if (!res.body.success) {
      // handle errors
    } else {
      return true
    }
  } catch (err) {
    console.error(err)
  }
}

export const signup = async (email, username, password) => {
  try {
    const res = await axios.post('/signup', {
      email,
      username,
      password
    })
    if (!res.body.success) {
      // handle errors
      // return res.body.errors
      // User res.body.errors to add the relevant error messages to the ui below the inputs
      // should look like { email: '...', username: '...', password: '...' } where there will be messages for what is invalid
    } else {
      return true
    }
  } catch (err) {
    console.error(err)
  }
}

export const logout = async (id) => {
  try {
    const res = await axios.get('logout')
    if (res.body.success) {
      return true
    } else {
      console.error(res.body.errors)
      return false
    }
  } catch (err) {
    console.error(err)
  }
}

