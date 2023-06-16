module.exports = (sequelize, DataTypes) => {
    const Result = sequelize.define("Result", {
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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
        studentFullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        studentUuid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        studentEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        testDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        testScore: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Result
}