const { Router } = require('express')
const wordController = require('../controllers/wordController')

const router = Router()

router.post('/createWord', wordController.createWord)

/**
 * Add conjugation for word by word ID
 * @param {string} id - the wordId
 */
router.post('/createConjugationForWord/:id', wordController.createConjugationForWord)

/**
 * Get all words by user ID and language
 * @param {string} id - the userId
 * @param {string} lang - language code to filter with
 */
router.get('/getWords/:id/:language', wordController.getAllWordsOfUser)

/**
 * Get word info by word ID
 * @param {string} id - the wordId
 */
router.get('/getWord/:id', wordController.getWordById)

/**
 * Get conjugation data for word by word ID
 * @param {string} id - the wordId
 */
router.get('/getConjugation/:id', wordController.getConjugation)

/**
 * Update word information by word ID
 * @param {string} id - the wordId
 */
router.put('/updateWord/:id', wordController.updateWord)

/**
 * Update word conjugation data by word ID
 * @param {string} id - the wordId
 */
router.put('/updateConjugation/:id', wordController.updateConjugation)

/**
 * Delete word by word ID
 * @param {string} id - the wordId
 */
router.delete('/deleteWord/:id', wordController.deleteWord)

module.exports = {
  wordRouter: router
}
