const express = require('express')
const router = express.Router()
const { checkAuth } = require('../middleware/checkAuth')
const { registerStaff, getStaffs, deleteStaff, editStaff } = require('../controller/Staff')

router.post('/staff/add', checkAuth, registerStaff)
router.get('/staff/manage', checkAuth, getStaffs)
router.delete('/staff/manage/delete_staff/:uuid', checkAuth, deleteStaff)
router.patch('/staff/manage/edit_staff/:uuid', checkAuth, editStaff)

module.exports = router