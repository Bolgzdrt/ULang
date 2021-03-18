const { Router } = require('express')
const wordController = require('../controllers/wordController')

const router = Router()

router.post('/createWord', wordController.createWord)
router.post('/createConjugationForWord/:id', wordController.createConjugationForWord)
router.get('/getWords/:id/:language', wordController.getAllWordsOfUser)
router.get('/getWord/:id', wordController.getWordById)
router.get('/getConjugation/:id', wordController.getConjugation)
router.put('/updateWord/:id', wordController.updateWord)
router.put('/updateConjugation/:id', wordController.updateConjugation)
router.delete('/deleteWord/:id', wordController.deleteWord)

module.exports = {
  wordRouter: router
}
