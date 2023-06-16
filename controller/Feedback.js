const { Feedback } = require('../models')
const asyncHandler = require('express-async-handler')
const { v4: uuid } = require('uuid')

const addFeedback = asyncHandler(async (req, res) => {
    const { feedback } = req.body
    if (!feedback) {
        res.status(400)
        throw new Error('All fields are required')
    }

    await Feedback.create({
        uuid: uuid(),
        feedback,
        senderUuid: req.user.uuid
    })
    return res.status(200).json('Feedback sent');
})

const getFeedback = asyncHandler(async (req, res) => {
    const result = await Feedback.findAll({
        where: {
            senderUuid: req.user.uuid
        }
    })
    return res.status(200).json({ result });
})
const getFeedbackAdmin = asyncHandler(async (req, res) => {
    const result = await Feedback.findAll({})
    return res.status(200).json({ result });
})

const updateFeedback = asyncHandler(async (req, res) => {
    const { uuid, reply } = req.body

    if (!uuid || !reply) {
        res.status(400)
        throw new Error('All fields are required')
    }

    const feedbackExist = await Feedback.findOne({
        where: {
            uuid
        }
    })
    if (!feedbackExist) {
        res.status(400)
        throw new Error('Feedback does not exist')
    }
    await Feedback.update({
        reply
    }, {
        where: {
            uuid
        }
    })
    return res.status(200).json('Feedback updated');
})
module.exports = {
    addFeedback,
    getFeedback,
    getFeedbackAdmin,
    updateFeedback
}