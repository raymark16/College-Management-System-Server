const express = require('express')
const router = express.Router()
const { checkAuth } = require('../middleware/checkAuth')
const { registerStudent, getStudents, deleteStudent, editStudent } = require('../controller/Student')

router.post('/student/add', checkAuth, registerStudent)
router.get('/student/manage', checkAuth, getStudents)
router.delete('/student/manage/delete_student/:uuid', checkAuth, deleteStudent)
router.patch('/student/manage/edit_student/:uuid', checkAuth, editStudent)

module.exports = router