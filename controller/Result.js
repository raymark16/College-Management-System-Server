const { Result } = require('../models')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const { v4: uuid } = require('uuid')

const addResult = asyncHandler(async (req, res) => {

    const { session, subject, studentFullName, studentUuid, studentEmail, testDescription, testScore } = req.body
    const { course, uuid: staffUuid, email: staff } = req.user
    if (!session, !subject, !studentFullName, !studentUuid, !studentEmail, !testDescription, !testScore) {
        res.status(400)
        throw new Error('All fields are required')
    }
    const result_exist = await Result.findOne({
        where: {
            course,
            staffUuid,
            studentUuid,
            session,
            subject,
            testDescription
        }
    })
    if (result_exist) {
        res.status(400)
        throw new Error('Result already exist')
    }
    await Result.create({
        uuid: uuid(),
        session,
        subject,
        studentFullName,
        studentUuid,
        studentEmail,
        testDescription,
        testScore,
        course,
        staffUuid,
        staff
    })
    return res.status(200).json('New Result is added');
})

const editResult = asyncHandler(async (req, res) => {
    const { session, subject, studentFullName, studentUuid, studentEmail, testDescription, testScore } = req.body
    const { course, uuid: staffUuid, email: staff } = req.user

    if (!session, !subject, !studentFullName, !studentUuid, !studentEmail, !testDescription, !testScore) {
        res.status(400)
        throw new Error('All fields are required')
    }
    const result_exist = await Result.findOne({
        where: {
            course,
            staffUuid,
            studentUuid,
            session,
            subject
        }
    })
    if (!result_exist) {
        res.status(400)
        throw new Error('Result does not exist')
    }
    await Result.update({
        testDescription,
        testScore,
        studentFullName,
        studentEmail,
        staff
    }, {
        where: {
            course,
            staffUuid,
            studentUuid,
            session,
            subject
        }
    })

    return res.status(200).json('Update Result Successfully');
})

const getResult = asyncHandler(async (req, res) => {
    const result = await Result.findAll({
        where: {
            staff: req.user.email
        }
    })
    return res.status(200).json({ result });
})
module.exports = {
    addResult,
    editResult,
    getResult
}