const { Attendance } = require('../models')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const { v4: uuid } = require('uuid')

const addAttendance = asyncHandler(async (req, res) => {
    const { date, course, staff, session, subject, absentStudents, presentStudents } = req.body
    if (!date, !course, !staff, !session, !subject) {
        res.status(400)
        throw new Error('All fields are required')
    }
    const attendance_exist = await Attendance.findOne({
        where: {
            date,
            course,
            staff,
            staffUuid: req.user.uuid,
            session,
            subject,
        }
    })
    if (attendance_exist) {
        res.status(400)
        throw new Error('Attendance already exist')
    }
    await Attendance.create({
        uuid: uuid(),
        date,
        course,
        staff,
        staffUuid: req.user.uuid,
        session,
        subject,
        absentStudents,
        presentStudents
    })
    return res.status(200).json('New attendance is added');
})

const updateAttendance = asyncHandler(async (req, res) => {
    const { date, course, staff, session, subject, absentStudents, presentStudents } = req.body

    if (!date || !course || !staff || !session || !subject) {
        res.status(400)
        throw new Error('All fields are required')
    }
    const attendance_exist = await Attendance.findOne({
        where: {
            date,
            course,
            staff,
            session,
            subject,
        }
    })
    if (!attendance_exist) {
        res.status(400)
        throw new Error('Attendance does not exist')
    }
    await Attendance.update({
        staff,
        absentStudents,
        presentStudents
    }, {
        where: {
            date,
            course,
            staff,
            staffUuid: req.user.uuid,
            session,
            subject,
        }
    })

    return res.status(200).json('Update Attendance Successfully');
})

const getAttendance = asyncHandler(async (req, res) => {
    const result = await Attendance.findAll({
        where: {
            staffUuid: req.user.uuid
        }
    })
    return res.status(200).json({ result });
})

const getAttendanceStudent = asyncHandler(async (req, res) => {
    const result = await Attendance.findAll({
        where: {
            course: req.user.course
        }
    })
    return res.status(200).json({ result });
})

const getAttendanceAdmin = asyncHandler(async (req, res) => {
    const result = await Attendance.findAll({})
    return res.status(200).json({ result });
})
module.exports = {
    addAttendance,
    updateAttendance,
    getAttendance,
    getAttendanceStudent,
    getAttendanceAdmin
}