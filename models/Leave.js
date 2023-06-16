module.exports = (sequelize, DataTypes) => {
    const Leave = sequelize.define("Leave", {
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userUuid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'Pending'
        }
    })

    return Leave
}