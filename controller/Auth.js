const { Auth } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const fs = require("fs")
const path = require('path')
const { v4: uuid } = require('uuid')

const registerUser = asyncHandler(async (req, res) => {
    if (req.files === null) {
        res.status(400)
        throw new Error('No File')
    }
    const { firstname, lastname, email, gender, password, address, role } = req.body
    const file = req.files.profilePicture

    if (!firstname || !lastname || !email || !gender || !password || !address || !role) {
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
const loginUser = asyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400)
        throw new Error('All fields are required')
    }
    const user = await Auth.findOne({
        where: {
            email: req.body.email
        }
    })

    if (!user) {
        res.status(400)
        throw new Error('No existing User')
    }
    const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password,
    );
    if (!isPasswordCorrect) {
        res.status(400)
        throw new Error('Email or Password is incorrect')
    }
    const payload = {
        uuid: user.uuid,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        gender: user.gender,
        profilePicture: user.profilePicture,
        address: user.address,
        role: user.role,
        course: user.course,
        session: user.session
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    return res
        .cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        })
        .status(200)
        .json({ message: 'login success' });
})
const logout = asyncHandler(async (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'logout success' });
})

const isLoggedIn = asyncHandler(async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.json({ loggedIn: false });
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.json({ loggedIn: false });
        }
        req.user = decoded
        return res.json({ loggedIn: true, userInfo: req.user });
    });
})

module.exports = {
    registerUser,
    loginUser,
    logout,
    isLoggedIn
}