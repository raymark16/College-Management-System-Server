const express = require('express')
const router = express.Router()
const { checkAuth } = require('../middleware/checkAuth')
const { updateBasicInfo, changePassword } = require('../controller/User')

router.patch('/update_profile/update_basic_info', checkAuth, updateBasicInfo)
router.patch('/update_profile/change_password', checkAuth, changePassword)
module.exports = router