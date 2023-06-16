const { Auth } = require('../models')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const fs = require("fs")
const path = require('path')

const updateBasicInfo = asyncHandler(async (req, res) => {
    if (req.files === null) {
        res.status(400)
        throw new Error('No File')
    }
    const { firstname, lastname, email, gender, address, prevEmail, prevPicture, role } = req.body
    const file = req.files.profilePicture
    if (!firstname || !lastname || !email || !gender || !address || !prevEmail || !prevPicture || !role) {
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

    await Auth.update({
        firstname,
        lastname,
        email,
        gender,
        profilePicture: `${email}_${file.name}`,
        address
    }, {
        where: {
            email: prevEmail
        }
    })

    file.mv(path.join(__dirname, '..', 'public', 'Uploads', `${email}_${file.name}`), err => {
        if (err) {
            res.status(400)
            throw new Error("Can't upload file")
        }
    })
    fs.unlink(path.join(__dirname, '..', 'public', 'Uploads', `${prevPicture}`), (err) => {
        if (err) {
            res.status(400)
            throw new Error("error deletion of file")
        }
    })
    return res.status(200).json('New User Created');
})


const changePassword = asyncHandler(async (req, res) => {
    const { password, new_password, email } = req.body

    if (!password || !new_password || !email) {
        res.status(400)
        throw new Error('All fields are required')
    }

    const user = await Auth.findOne({
        where: {
            email: email
        }
    })

    if (!user) {
        res.status(400)
        throw new Error('There is no user')
    }
    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password,
    )
    if (!isPasswordCorrect) {
        res.status(400)
        throw new Error('Password is incorrect')
    }
    const hashedNewPassword = await bcrypt.hash(new_password, parseInt(process.env.SALT));

    await Auth.update({
        password: hashedNewPassword
    }, {
        where: {
            email: email
        }
    })

    return res.status(200).json('New Password has been set');
})


module.exports = {
    updateBasicInfo,
    changePassword
}