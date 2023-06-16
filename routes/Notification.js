const express = require('express')
const router = express.Router()
const { checkAuth } = require('../middleware/checkAuth')
const { addStaffNotification, getStaffNotification, addStudentNotification } = require('../controller/Notification')

router.post('/staff/notify', checkAuth, addStaffNotification)
router.get('/staff/view/notifications', checkAuth, getStaffNotification)
router.post('/student/notify', checkAuth, addStudentNotification)
module.exports = router
