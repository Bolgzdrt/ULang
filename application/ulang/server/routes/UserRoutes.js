const { Router } = require('express')
const userController = require('../controllers/userController')

const router = Router()

router.post('/followUser', userController.followUser)
router.post('/unfollowUser', userController.unfollowUser)

/**
 * Get followed users list by user ID
 * @param {string} id - the userId
 */
router.get('/getFollowing/:id', userController.getFollowingList)

/**
 * Get followed users info list by user ID
 * @param {string} id - the userId
 */
router.get('/getFollowingInfo/:id', userController.getFolledUserInfo)

/**
 * Get user info by user ID
 * @param {string} id - the userId
 */
router.get('/getUserInfo/:id', userController.getUserInfo)

/**
 * Get user language list by user ID
 * @param {string} id - the userId
 */
router.get('/getUserLanguages/:id', userController.getUserLanguages)

/**
 * Add another language to user by user ID
 * @param {string} id - the userId
 */
router.post('/addLanguagesToUser/:id', userController.addLanguagesToUser)

/**
 * Update user info by user ID
 * @param {string} id - the userId
 */
router.put('/updateUserInfo/:id', userController.updateUserInfo)

/**
 * Update user email address by user ID
 * @param {string} id - the userId
 */
router.put('/changeEmail/:id', userController.changeEmail)

/**
 * Update user password by user ID
 * @param {string} id - the userId
 */
router.put('/changePassword/:id', userController.changePassword)

/**
 * Delete user account by user ID
 * @param {string} id - the userId
 */
router.delete('/deleteAccount/:id', userController.deleteAccount)

/**
 * Returns possible users by input string
 * @param {string} id - the userId
 */
router.get('/searchNames/:query', userController.searchNames)

/**
 * Get quick access sets by user ID and current language
 * @param {string} id - the userId
 * @param {string} lang - language code to filter with
 */
router.get('/getQuickSets/:id/:language', userController.getQuickSets)
router.post('/addQuickSet', userController.addQuickSet)
router.post('/removeQuickSet', userController.removeQuickSet)
router.post('/addSet', userController.addSet)
router.post('/removeSet', userController.removeSet)

module.exports = {
  userRouter: router
}
