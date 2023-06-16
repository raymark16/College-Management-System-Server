const express = require('express')
const router = express.Router()
const { checkAuth } = require('../middleware/checkAuth')
const { getSession, addSession, deleteSession, editSession } = require('../controller/Session')

router.get('/session/manage', checkAuth, getSession)
router.post('/session/add', checkAuth, addSession)
router.delete('/session/manage/delete_session/:uuid', checkAuth, deleteSession)
router.patch('/session/manage/edit_session/:uuid', checkAuth, editSession)

module.exports = router