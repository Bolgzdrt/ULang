const jwt = require('jsonwebtoken')

/**
 * verification step for actions in other methods
 * checks if auth token is valid before action is completed
 */
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

module.exports = {
  requireAuth
}
