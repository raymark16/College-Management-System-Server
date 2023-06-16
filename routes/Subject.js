const express = require('express')
const router = express.Router()
const { checkAuth } = require('../middleware/checkAuth')
const { getSubject, addSubject, deleteSubject, editSubject } = require('../controller/Subject')

router.get('/subject/manage', checkAuth, getSubject)

router.post('/subject/add', checkAuth, addSubject)
router.delete('/subject/manage/delete_subject/:uuid', checkAuth, deleteSubject)
router.patch('/subject/manage/edit_subject/:uuid', checkAuth, editSubject)

module.exports = router