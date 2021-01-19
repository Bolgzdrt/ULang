const axios = require('axios')

const login = async (email, password) => {
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
    console.error(err.message)
  }
}

module.exports = {
  login
}
