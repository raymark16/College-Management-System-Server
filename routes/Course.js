const express = require('express')
const router = express.Router()
const { checkAuth } = require('../middleware/checkAuth')
const { addCourse, getCourses, deleteCourse, editCourse } = require('../controller/Course')

router.post('/course/add', checkAuth, addCourse)
router.get('/course/manage', checkAuth, getCourses)
router.delete('/course/manage/delete_course/:course', checkAuth, deleteCourse)
router.patch('/course/manage/edit_course/:uuid', checkAuth, editCourse)
module.exports = router