module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define("Feedback", {
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        feedback: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reply: {
            type: DataTypes.STRING,
            defaultValue: 'Pending'
        },
        senderUuid: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })


    return Feedback
}