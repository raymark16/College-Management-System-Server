module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define("Subject", {
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        subject_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        staff: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        course: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Subject
}