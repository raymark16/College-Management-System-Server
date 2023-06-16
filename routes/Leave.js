const express = require('express')
const router = express.Router()
const { checkAuth } = require('../middleware/checkAuth')
const { applyLeave, getLeave, updateLeave, getLeaveAdmin } = require('../controller/Leave')

router.post('/apply/leave', checkAuth, applyLeave)
router.patch('/update/leave', checkAuth, updateLeave)
router.get('/get/leave', checkAuth, getLeave)
router.get('/get/admin/leave', checkAuth, getLeaveAdmin)
module.exports = router