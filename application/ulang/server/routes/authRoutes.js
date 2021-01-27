const { Router } = require('express')
const authController = require('../controllers/authController')

const router = Router()

router.post('/login', authController.login)

router.post('/signup', authController.signup)

router.post('/logout', authController.logout)

module.exports = {
  authRouter: router
}
