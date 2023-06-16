module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define("Notification", {
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        notification_desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        receiverUuid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senderUuid: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Notification
}