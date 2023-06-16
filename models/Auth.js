module.exports = (sequelize, DataTypes) => {
    const Auth = sequelize.define("Auth", {
        uuid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profilePicture: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        course: {
            type: DataTypes.STRING
        },
        session: {
            type: DataTypes.STRING
        }
    })

    return Auth
}