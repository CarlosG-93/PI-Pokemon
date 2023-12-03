const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('type', {
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
        },
        {
            timestamps: false                
    })
}