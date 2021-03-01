const { Router } = require('express')
const userController = require('../controllers/userController')

const router = Router()

router.post('/followUser', userController.followUser)
router.post('/unfollowUser', userController.unfollowUser)
router.get('/getUserInfo/:id', userController.getUserInfo)
router.get('/getUserLanguages/:id', userController.getUserLanguages)
router.post('/addLanguagesToUser/:id', userController.addLanguagesToUser)
router.put('/updateUserInfo/:id', userController.updateUserInfo)
router.put('/changeEmail/:id', userController.changeEmail)
router.put('/changePassword/:id', userController.changePassword)
router.delete('/deleteAccount/:id', userController.deleteAccount)
router.get('/getUserByInfo', userController.getUserByInfo)

module.exports = {
  userRouter: router
}
