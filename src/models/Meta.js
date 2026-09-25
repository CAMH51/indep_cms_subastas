const {DataTypes} = require('sequelize');
const sequelize = require('../config/dbPostgreSQL');

const Entity = sequelize.define('Entity',{
    name: {
        type:DataTypes.STRING(50),
        allowNull:false,
        unique: true
    }
});

const Field = sequelize.define('Field',{
    name: {
        type:DataTypes.STRING(50),
        allowNull:false
    },
    type:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    length:{
        type:DataTypes.INTEGER
    },
    scale:{
        type:DataTypes.INTEGER
    },
    required:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
});


module.exports= {
    Entity,
    Field
}
