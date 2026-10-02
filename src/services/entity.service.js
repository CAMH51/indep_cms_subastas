const { name } = require('ejs');
const {Entity, Field} = require('../models');

exports.getAll = async() =>{
    const entities = await Entity.findAll(
        {
            include:[{model: Field, as: 'fields'}],
            order:[['name','ASC']]
        });
    return entities;
}

exports.getId = async(id) =>{
    const entity = await Entity.findOne(
        {
            where:{entity_id:id},
            include:[{model: Field, as: 'fields'}]
        });
    return entity;
}

exports.getName = async(name) =>{
    const entity = await Entity.findOne(
        {
            where:{name:name},
            include:[{model: Field, as: 'fields'}]
        });
    return entity;
}

exports.create  = async(data) =>{
    const entity = await Entity.create(
        data,
        {include:[{model:Field, as:'fields'}]}
    );

    return entity;
}