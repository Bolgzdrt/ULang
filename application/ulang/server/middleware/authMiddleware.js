/* Nothing in here is currently being used yet */
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.redirect('/login')
      } else {
        next()
      }
    })
  } else {
    res.redirect('/login')
  }
}

// This doesn't really do anything right now, but I'll leave it for now
const checkUser = (req, _, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        next()
      } else {
        let user = await User.findById(decodedToken.id)
        if (user._id) {
          next()
        }
      }
    })
  } else {
    next()
  }
}

module.exports = {
  requireAuth,
  checkUser
}
