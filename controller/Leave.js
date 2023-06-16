const { Leave } = require('../models')
const asyncHandler = require('express-async-handler')
const { v4: uuid } = require('uuid')

const applyLeave = asyncHandler(async (req, res) => {
    const { date, message } = req.body
    if (!date || !message) {
        res.status(400)
        throw new Error('All fields are required')
    }

    await Leave.create({
        uuid: uuid(),
        date,
        message,
        userUuid: req.user.uuid
    })
    return res.status(200).json('Apply leave is pending');
})

const getLeave = asyncHandler(async (req, res) => {
    const result = await Leave.findAll({
        where: {
            userUuid: req.user.uuid
        }
    })
    return res.status(200).json({ result });
})
const getLeaveAdmin = asyncHandler(async (req, res) => {
    const result = await Leave.findAll({})
    return res.status(200).json({ result });
})
const updateLeave = asyncHandler(async (req, res) => {
    const { uuid, status } = req.body

    if (!uuid || !status) {
        res.status(400)
        throw new Error('All fields are required')
    }

    const leaveExist = await Leave.findOne({
        where: {
            uuid
        }
    })
    if (!leaveExist) {
        res.status(400)
        throw new Error('Leave does not exist')
    }
    await Leave.update({
        status
    }, {
        where: {
            uuid
        }
    })
    return res.status(200).json('Leave updated');
})
module.exports = {
    applyLeave,
    getLeave,
    updateLeave,
    getLeaveAdmin
}