const { Router } = require('express')
const setController = require('../controllers/setController')

const router = Router()

router.post('/createSet', setController.createSet)
/**
 * {id}: userId
 * {lang}: language code
 */
router.get('/getSetsOfLang/:id/:lang', setController.getAllSetsOfLanguage)
router.get('/getSet/:id', setController.getSetById)
router.put('/updateSet/:id', setController.updateSet)
router.put('/toggleFavorite/:id', setController.toggleFavorite)
router.delete('/deleteSet/:id', setController.deleteSet)

module.exports = {
  setRouter: router
}
