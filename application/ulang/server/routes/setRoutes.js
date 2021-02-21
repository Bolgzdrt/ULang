const { Router } = require('express')
const setController = require('../controllers/setController')

const router = Router()

router.post('/createSet', setController.createSet)
/**
 * Get Sets By Language
 * @param {string} id - the userId
 * @param {string} lang - language code to filter with
 */
router.get('/getSetsOfLang/:id/:lang', setController.getAllSetsOfLanguage)
router.get('/getSet/:id', setController.getSetById)
router.get('/getWordsInSet/:id', setController.getWordsInSet)
router.put('/updateSet/:id', setController.updateSet)
router.put('/toggleFavorite/:id', setController.toggleFavorite)
router.delete('/deleteSet/:id', setController.deleteSet)

module.exports = {
  setRouter: router
}
