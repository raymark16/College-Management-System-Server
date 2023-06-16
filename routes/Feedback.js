const express = require('express')
const router = express.Router()
const { checkAuth } = require('../middleware/checkAuth')
const { addFeedback, getFeedback, getFeedbackAdmin, updateFeedback } = require('../controller/Feedback')

router.post('/feedback', checkAuth, addFeedback)
router.patch('/update/admin/feedback', checkAuth, updateFeedback)
router.get('/get/feedback', checkAuth, getFeedback)
router.get('/get/admin/feedback', checkAuth, getFeedbackAdmin)
module.exports = router