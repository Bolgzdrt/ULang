const { Router } = require('express')
const userController = require('../controllers/userController')

const router = Router()

router.post('/followUser', userController.followUser)
router.post('/unfollowUser', userController.unfollowUser)
router.get('/getUserInfo/:id', userController.getUserInfo)

module.exports = {
  userRouter: router
}
