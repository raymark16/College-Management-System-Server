module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define("Course", {
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        course_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    })


    return Course
}