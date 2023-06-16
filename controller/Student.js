const { Auth } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const fs = require("fs")
const path = require('path')
const { v4: uuid } = require('uuid')

const registerStudent = asyncHandler(async (req, res) => {
    if (req.files === null) {
        res.status(400)
        throw new Error('No File')
    }
    const { firstname, lastname, email, gender, password, address, course, session, role } = req.body
    const file = req.files.profilePicture

    if (!firstname || !lastname || !email || !gender || !password || !address || !course || !session || !role) {
        res.status(400)
        throw new Error('All fields are required')
    }
    const userExist = await Auth.findOne({
        where: {
            email: email
        }
    })
    if (userExist) {
        res.status(400)
        throw new Error('Email already taken')
    }
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

    await Auth.create({
        uuid: uuid(),
        firstname,
        lastname,
        email,
        gender,
        password: hashedPassword,
        profilePicture: `${email}_${file.name}`,
        course,
        address,
        session,
        role
    })
    file.mv(path.join(__dirname, '..', 'public', 'Uploads', `${email}_${file.name}`), err => {
        if (err) {
            res.status(400)
            throw new Error("Can't upload file")
        }
    })
    return res.status(200).json('New User Created');
})

const getStudents = asyncHandler(async (req, res) => {
    const result = await Auth.findAll({
        where: {
            role: 'Student'
        }
    })
    return res.status(200).json({ result });
})

const deleteStudent = asyncHandler(async (req, res) => {
    const student = await Auth.findOne({
        where: {
            uuid: req.params.uuid
        }
    })
    if (!student) {
        res.status(400)
        throw new Error("Student doesn't exist")
    }

    await Auth.destroy({
        where: {
            uuid: student.uuid
        }
    })
    fs.unlink(path.join(__dirname, '..', 'public', 'Uploads', `${student.profilePicture}`), (err) => {
        if (err) {
            res.status(400)
            throw new Error("error deletion of file")
        }
    })
    return res.status(200).json('Student was deleted');
})

const editStudent = asyncHandler(async (req, res) => {
    if (req.files === null) {
        res.status(400)
        throw new Error('No File')
    }
    const { firstname, lastname, email, gender, password, address, course, session, role } = req.body
    const file = req.files.profilePicture

    if (!firstname || !lastname || !email || !gender || !password || !address || !course || !session || !role) {
        res.status(400)
        throw new Error('All fields are required')
    }
    const studentExist = await Auth.findOne({
        where: {
            uuid: req.params.uuid
        }
    })
    if (!studentExist) {
        res.status(400)
        throw new Error('Student does not exist')
    }
    const editStudent = await Auth.findOne({
        where: {
            email: email
        }
    })
    if (editStudent) {
        res.status(400)
        throw new Error('Email already Exist')
    }
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

    await Auth.update({
        firstname,
        lastname,
        email,
        gender,
        password: hashedPassword,
        profilePicture: `${email}_${file.name}`,
        course,
        address,
        session,
        role
    }, {
        where: {
            uuid: studentExist.uuid
        }
    })
    file.mv(path.join(__dirname, '..', 'public', 'Uploads', `${email}_${file.name}`), err => {
        if (err) {
            res.status(400)
            throw new Error("Can't upload file")
        }
    })
    fs.unlink(path.join(__dirname, '..', 'public', 'Uploads', `${studentExist.profilePicture}`), (err) => {
        if (err) {
            res.status(400)
            throw new Error("error deletion of file")
        }
    })
    return res.status(200).json('Edit Student Successfully');
})
module.exports = {
    registerStudent,
    getStudents,
    deleteStudent,
    editStudent
}