module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define("Attendance", {
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        course: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        staff: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        staffUuid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        session: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        absentStudents: {
            type: DataTypes.STRING(3000),
            allowNull: false
        },
        presentStudents: {
            type: DataTypes.STRING(3000),
            allowNull: false
        }
    })

    return Attendance
}