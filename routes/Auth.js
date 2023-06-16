const express = require('express')
const router = express.Router()
const { registerUser, loginUser, isLoggedIn, logout } = require('../controller/Auth')

router.post('/auth/register', registerUser)
router.post('/auth/login', loginUser)
router.get('/auth/logout', logout)
router.get('/auth/is_logged_in', isLoggedIn)

module.exports = router