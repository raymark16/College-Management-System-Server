const { Notification } = require('../models')
const asyncHandler = require('express-async-handler')
const { v4: uuid } = require('uuid')

const addStaffNotification = asyncHandler(async (req, res) => {
    const { receiverUuid, senderUuid, notification_desc } = req.body
    console.log(receiverUuid, senderUuid, notification_desc)
    if (!receiverUuid || !senderUuid || !notification_desc) {
        res.status(400)
        throw new Error('Notify Error')
    }

    await Notification.create({
        uuid: uuid(),
        receiverUuid,
        senderUuid,
        notification_desc
    })
    return res.status(200).json('Notification is added');
})

const addStudentNotification = asyncHandler(async (req, res) => {
    const { receiverUuid, senderUuid, notification_desc } = req.body
    console.log(receiverUuid, senderUuid, notification_desc)
    if (!receiverUuid || !senderUuid || !notification_desc) {
        res.status(400)
        throw new Error('Notify Error')
    }

    await Notification.create({
        uuid: uuid(),
        receiverUuid,
        senderUuid,
        notification_desc
    })
    return res.status(200).json('Notification is added');
})

const getStaffNotification = asyncHandler(async (req, res) => {
    const result = await Notification.findAll({ where: { receiverUuid: req.user.uuid } })
    return res.status(200).json({ result });
})

module.exports = {
    addStaffNotification,
    addStudentNotification,
    getStaffNotification
}