const { Course } = require('../models')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const { v4: uuid } = require('uuid')

const addCourse = asyncHandler(async (req, res) => {
    const { course_name } = req.body
    if (!course_name) {
        res.status(400)
        throw new Error('Course name is empty')
    }
    const course_name_exist = await Course.findOne({
        where: {
            course_name: course_name
        }
    })
    if (course_name_exist) {
        res.status(400)
        throw new Error('Course name already exist')
    }
    await Course.create({
        uuid: uuid(),
        course_name
    })
    return res.status(200).json('New course is added');
})

const getCourses = asyncHandler(async (req, res) => {
    const result = await Course.findAll({})
    return res.status(200).json({ result });
})

const deleteCourse = asyncHandler(async (req, res) => {
    await Course.destroy({
        where: {
            course_name: req.params.course
        }
    })
    return res.status(200).json('Course was deleted');
})

const editCourse = asyncHandler(async (req, res) => {
    const { course_name } = req.body

    if (!course_name) {
        res.status(400)
        throw new Error('All fields are required')
    }

    const courseExist = await Course.findOne({
        where: {
            uuid: req.params.uuid
        }
    })
    if (!courseExist) {
        res.status(400)
        throw new Error('Course does not exist')
    }

    const courseDuplicate = await Course.findOne({
        where: {
            course_name
        }
    })
    if (courseDuplicate) {
        res.status(400)
        throw new Error('Course already Exist')
    }
    await Course.update({
        course_name
    }, {
        where: {
            uuid: courseExist.uuid
        }
    })
    return res.status(200).json('Edit Course Successfully');
})

module.exports = {
    addCourse,
    getCourses,
    deleteCourse,
    editCourse
}