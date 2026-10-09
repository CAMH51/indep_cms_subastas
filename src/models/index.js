const sequelize = require('../config/dbPostgreSQL');

const {Entity, Field} = require('./Meta');
const Dynamic = require('./Dynamic');

Entity.hasMany(Field,{as: 'fields', foreignKey: 'fk_entity_id',  onDelete: 'CASCADE'});
Field.belongsTo(Entity, {
    foreignKey: 'fk_entity_id'
});

module.exports= {
    sequelize,
    Entity,
    Field,
    Dynamic
}