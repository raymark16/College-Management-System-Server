const { Auth, Course } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const fs = require("fs")
const path = require('path')
const { v4: uuid } = require('uuid')

const registerStaff = asyncHandler(async (req, res) => {
    if (req.files === null) {
        res.status(400)
        throw new Error('No File')
    }
    const { firstname, lastname, email, gender, password, address, course, role } = req.body
    const file = req.files.profilePicture

    if (!firstname || !lastname || !email || !gender || !password || !address || !course || !role) {
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
        address,
        course,
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

const getStaffs = asyncHandler(async (req, res) => {
    const result = await Auth.findAll({
        where: {
            role: 'Staff'
        }
    })
    return res.status(200).json({ result });
})

const deleteStaff = asyncHandler(async (req, res) => {
    const staff = await Auth.findOne({
        where: {
            uuid: req.params.uuid
        }
    })
    if (!staff) {
        res.status(400)
        throw new Error("Staff doesn't exist")
    }

    await Auth.destroy({
        where: {
            uuid: staff.uuid
        }
    })
    fs.unlink(path.join(__dirname, '..', 'public', 'Uploads', `${staff.profilePicture}`), (err) => {
        if (err) {
            res.status(400)
            throw new Error("error deletion of file")
        }
    })
    return res.status(200).json('Staff was deleted');
})

const editStaff = asyncHandler(async (req, res) => {
    if (req.files === null) {
        res.status(400)
        throw new Error('No File')
    }
    const { firstname, lastname, email, gender, password, address, course, role } = req.body
    const file = req.files.profilePicture

    if (!firstname || !lastname || !email || !gender || !password || !address || !course || !role) {
        res.status(400)
        throw new Error('All fields are required')
    }
    const userExist = await Auth.findOne({
        where: {
            uuid: req.params.uuid
        }
    })
    if (!userExist) {
        res.status(400)
        throw new Error('Staff does not exist')
    }
    const editUser = await Auth.findOne({
        where: {
            email
        }
    })
    if (editUser) {
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
        role
    }, {
        where: {
            uuid: userExist.uuid
        }
    })
    file.mv(path.join(__dirname, '..', 'public', 'Uploads', `${email}_${file.name}`), err => {
        if (err) {
            res.status(400)
            throw new Error("Can't upload file")
        }
    })
    fs.unlink(path.join(__dirname, '..', 'public', 'Uploads', `${userExist.profilePicture}`), (err) => {
        if (err) {
            res.status(400)
            throw new Error("error deletion of file")
        }
    })
    return res.status(200).json('Edit Staff Successfully');
})

module.exports = {
    registerStaff,
    getStaffs,
    deleteStaff,
    editStaff
}