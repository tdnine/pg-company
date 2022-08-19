const { Router } = require('express')
const router = Router()
const empController = require('../controllers/empController')

router.post('/new', empController.newEmp)

router.post('/addr', empController.newAddr)

router.get('/:id', empController.getSingleEmp)

router.get('/', empController.filteredEmp)



module.exports = router