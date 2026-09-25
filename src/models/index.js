const sequelize = require('../config/dbPostgreSQL');

const {Entity, Field} = require('./Meta');
const Dynamic = require('./Dynamic');

Entity.hasMany(Field,{as: 'fields', onDelete: 'CASCADE'});
Field.belongsTo(Entity);

module.exports= {
    sequelize,
    Entity,
    Field,
    Dynamic
}