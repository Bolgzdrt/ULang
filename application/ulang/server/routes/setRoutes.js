const { Router } = require('express')
const setController = require('../controllers/setController')

const router = Router()

router.post('/createSet', setController.createSet)
router.get('/getSets', setController.getAllSets)
router.get('/getSet/:id', setController.getSetById)
router.put('/updateSet/:id', setController.updateSet)
router.delete('/deleteSet/:id', setController.deleteSet)

module.exports = {
  setRouter: router
}
