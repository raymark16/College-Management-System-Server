const express = require('express')
const router = express.Router()
const { checkAuth } = require('../middleware/checkAuth')
const { addAttendance, updateAttendance, getAttendance, getAttendanceStudent, getAttendanceAdmin } = require('../controller/Attendance')

router.post('/take/attendance', checkAuth, addAttendance)
router.patch('/update/attendance', checkAuth, updateAttendance)
router.get('/get/attendance', checkAuth, getAttendance)
router.get('/student/get/attendance', checkAuth, getAttendanceStudent)
router.get('/admin/get/attendance', checkAuth, getAttendanceAdmin)
module.exports = router