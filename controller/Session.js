const { Session } = require('../models')
const asyncHandler = require('express-async-handler')
const { v4: uuid } = require('uuid')

const getSession = asyncHandler(async (req, res) => {
    const result = await Session.findAll({})
    return res.status(200).json({ result });
})

const addSession = asyncHandler(async (req, res) => {
    const { start_year, end_year } = req.body
    if (!start_year || !end_year) {
        res.status(400)
        throw new Error('All fields are required')
    }

    const session_exist = await Session.findOne({
        where: {
            start_year: start_year,
            end_year: end_year
        }
    })
    if (session_exist) {
        res.status(400)
        throw new Error('Session already exist')
    }
    await Session.create({
        uuid: uuid(),
        start_year,
        end_year
    })
    return res.status(200).json('New session is added');
})

const deleteSession = asyncHandler(async (req, res) => {
    const session = await Session.findOne({
        where: {
            uuid: req.params.uuid
        }
    })
    if (!session) {
        res.status(400)
        throw new Error("Session doesn't exist")
    }

    await Session.destroy({
        where: {
            uuid: session.uuid
        }
    })

    return res.status(200).json('Session was deleted');
})


const editSession = asyncHandler(async (req, res) => {
    const { start_year, end_year } = req.body

    if (!start_year || !end_year) {
        res.status(400)
        throw new Error('All fields are required')
    }

    const sessionExist = await Session.findOne({
        where: {
            uuid: req.params.uuid
        }
    })
    if (!sessionExist) {
        res.status(400)
        throw new Error('Session does not exist')
    }

    const sessionDuplicate = await Session.findOne({
        where: {
            start_year,
            end_year
        }
    })
    if (sessionDuplicate) {
        res.status(400)
        throw new Error('Session already Exist')
    }
    await Session.update({
        start_year,
        end_year
    }, {
        where: {
            uuid: sessionExist.uuid
        }
    })
    return res.status(200).json('Edit Session Successfully');
})

module.exports = {
    getSession,
    addSession,
    deleteSession,
    editSession
}