const User = require('../models/User')
const Set = require('../models/Set')
const jwt = require('jsonwebtoken')
const { capitalizeWord } = require('../utils/utils')

// handle errors
const handleErrors = (err) => {
  console.log(err)
  let errors = { email: '', password: '', username: '' }

  if (err.code === 11000) {
    errors['email'] = 'That email is already registered to an account'
    return errors
  }

  // incorrect username
  if (err.message.includes('is not registered')) {
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
  let { email, username, password, primaryLanguage } = req.body
  if (!primaryLanguage) {
    primaryLanguage = 'french'
  }

  try {
    const lang = primaryLanguage
    const user = await User.create({
      email,
      username,
      password,
      languagesStudying: [lang],
      primaryLanguage: lang
    })
    const newSet = await Set.create({
      name: `${capitalizeWord(lang)} Dictionary`,
      language: lang,
      ownerId: user._id
    })
    User.findByIdAndUpdate(user._id, { dictionaries: [ newSet._id ]}, { new: true, useFindAndModify: false }, (err, user) => {})
    const token = createToken(user._id)
    res.cookie('jwt', token, { /* httpOnly: true, */ maxAge: maxAge * 1000 })
    res.status(201).json({
      success: true,
      userId: user._id
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
  const { username, password } = req.body

  try {
    const user = await User.login(username, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, { /* httpOnly: true, */ maxAge: maxAge * 1000 })
    res.status(200).json({
      success: true,
      userId: user._id
    })
  } catch (err) {
    const errors = handleErrors(err)
    console.log(errors)
    res.status(400).json({
      success: false,
      errors
    })
  }
}

module.exports = {
  signup,
  login,
}
