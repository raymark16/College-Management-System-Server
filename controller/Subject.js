const { Subject } = require('../models')
const asyncHandler = require('express-async-handler')
const { v4: uuid } = require('uuid')

const getSubject = asyncHandler(async (req, res) => {
    const result = await Subject.findAll({})
    return res.status(200).json({ result });
})

const getSubjectFiltered = asyncHandler(async (req, res) => {
    const result = await Subject.findAll({
        where: {
            course: req.user.course
        }
    })
    return res.status(200).json({ result });
})

const addSubject = asyncHandler(async (req, res) => {
    const { subject_name, staff, course } = req.body
    if (!subject_name || !staff || !course) {
        res.status(400)
        throw new Error('All fields are required')
    }

    const subject_exist = await Subject.findOne({
        where: {
            subject_name
        }
    })
    if (subject_exist) {
        res.status(400)
        throw new Error('Subjeect already exist')
    }
    await Subject.create({
        uuid: uuid(),
        subject_name,
        staff,
        course
    })
    return res.status(200).json('New subject is added');
})

const deleteSubject = asyncHandler(async (req, res) => {
    const subject = await Subject.findOne({
        where: {
            uuid: req.params.uuid
        }
    })
    if (!subject) {
        res.status(400)
        throw new Error("Subject doesn't exist")
    }

    await Subject.destroy({
        where: {
            uuid: subject.uuid
        }
    })

    return res.status(200).json('Subject was deleted');
})


const editSubject = asyncHandler(async (req, res) => {
    const { subject_name, staff, course } = req.body

    if (!subject_name || !staff || !course) {
        res.status(400)
        throw new Error('All fields are required')
    }

    const subjectExist = await Subject.findOne({
        where: {
            uuid: req.params.uuid
        }
    })
    if (!subjectExist) {
        res.status(400)
        throw new Error('Subject does not exist')
    }
    const subjectDuplicate = await Subject.findOne({
        where: {
            subject_name
        }
    })
    if (subjectDuplicate) {
        res.status(400)
        throw new Error('Subject already exist')
    }
    await Subject.update({
        subject_name,
        staff,
        course
    }, {
        where: {
            uuid: subjectExist.uuid
        }
    })
    return res.status(200).json('Edit Subject Successfully');
})

module.exports = {
    getSubject,
    addSubject,
    deleteSubject,
    editSubject,
    getSubjectFiltered
}