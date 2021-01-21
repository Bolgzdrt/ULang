const User = require('../models/User')
const jwt = require('jsonwebtoken')

// handle errors
const handleErrors = (err) => {
  let errors = { email: '', password: '', username: '' }

  if (err.code === 11000) {
    errors['email'] = 'That email is already registered to an account'
    return errors
  }

  // incorrect username
  if (!(err.message.includes('is not registered') !== -1)) {
    errors.username = err.message
  }

  // incorrect password
  if (err.message === 'Incorrect password') {
    errors.password = 'Password is incorrect'
  }

  // Validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }
  return errors
}

const maxAge = 60 * 60 * 24
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge
  })
}

const signup = async (req, res) => {
  const { email, username, password } = req.body

  try {
    const user = await User.create({ email, username, password })
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json({
      status: true,
      user
    })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({
      success: false,
      errors
    })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(200).json({
      success: true,
      user: user._id
    })
  } catch (err) {
    const errors = handleErrors(err)
    res.status(400).json({
      success: false,
      errors
    })
  }
}

const logout = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.redirect('/')
}

module.exports = {
  signup,
  login,
  logout
}
