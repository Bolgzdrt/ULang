const { Router } = require('express')
const wordController = require('../controllers/wordController')

const router = Router()

router.post('/createWord', wordController.createWord)
router.get('/getWords/:id/:language', wordController.getAllWordsOfUser)
router.get('/getWord/:id', wordController.getWordById)
router.put('/updateWord/:id', wordController.updateWord)
router.delete('/deleteWord/:id', wordController.deleteWord)

module.exports = {
  wordRouter: router
}
