const express = require('express')
const router = express.Router()
const { checkAuth } = require('../middleware/checkAuth')
const { addResult, editResult, getResult } = require('../controller/Result')

router.post('/add/result', checkAuth, addResult)
router.patch('/edit/result', checkAuth, editResult)
router.get('/get/result', checkAuth, getResult)
module.exports = router