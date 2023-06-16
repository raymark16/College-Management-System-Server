const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
require("dotenv").config()
const port = process.env.PORT || 5000
const auth = require('./routes/Auth')
const user = require('./routes/User')
const course = require('./routes/Course')
const staff = require('./routes/Staff')
const session = require('./routes/Session')
const subject = require('./routes/Subject')
const student = require('./routes/Student')
const notification = require('./routes/Notification')
const leave = require('./routes/Leave')
const feedback = require('./routes/Feedback')
const attendance = require('./routes/Attendance')
const result = require('./routes/Result')
const mysql = require('mysql2')
const path = require('path')
const db = require('./models')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const fileUpload = require('express-fileupload')
//middleware
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
// app.use(notFound)
//app.use(errorHandler)
//route
app.use('/', auth)
app.use('/', user)
app.use('/', course)
app.use('/', staff)
app.use('/', session)
app.use('/', subject)
app.use('/', student)
app.use('/', notification)
app.use('/', leave)
app.use('/', feedback)
app.use('/', attendance)
app.use('/', result)
//dbconnection
db.sequelize.sync().then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`))
})