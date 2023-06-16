module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define("Session", {
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        start_year: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        end_year: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    return Session
}