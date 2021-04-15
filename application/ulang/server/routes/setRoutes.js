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

/**
 * Get 4 most recently created sets
 * @param {string} id - the userId
 * @param {string} lang - language code to filter with
 */
router.get('/getMostRecentSets/:id/:lang', setController.getMostRecentSets)

/**
 * Get list of sets containing verbs
 * @param {string} id - the userId
 * @param {string} lang - language code to filter with
 */
router.get('/getSetsWithVerbs/:id/:lang', setController.getSetsWithVerbs)

/**
 * Get set by set ID
 * @param {string} id - the setId
 */
router.get('/getSet/:id', setController.getSetById)

/**
 * Get all words in set by set ID
 * @param {string} id - the setId
 */
router.get('/getWordsInSet/:id', setController.getWordsInSet)

/**
 * Update set by set ID
 * @param {string} id - the setId
 */
router.put('/updateSet/:id', setController.updateSet)

/**
 * Add/remove set from favorites by set ID
 * @param {string} id - the setId
 */
router.put('/toggleFavorite/:id', setController.toggleFavorite)

/**
 * Delete set by set ID
 * @param {string} id - the setId
 */
router.delete('/deleteSet/:id', setController.deleteSet)

module.exports = {
  setRouter: router
}
