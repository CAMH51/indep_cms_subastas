
const {buildModel, validateDefinition, registry} = require('../models/Dynamic')
const entityService = require('../services/entity.service');

exports.renderNewEntities = (req, res) =>{
    res.render('dashboard',{
        page:"entities/form_nueva_entidad",
        error:null,
        titulo:'Nueva Libreria'
    })
}

exports.renderListEntities = async(req, res) =>{
    try {
        const entities = await entityService.getAll();
        console.log('entities',entities)
        res.render('dashboard',{
            titulo:"Dashboard",
            page:"dashboard/home",
            entities
        })
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

exports.createEntity = async(req, res) =>{
    console.log('req.body',req.body);
    const name = (req.body.name || '').trim();
    const fields = Object.values(req.body.fields || {}).map((f) => ({
      name: (f.name || '').trim(),
      type: f.type,
      label:f.label,
      length: f.length ? Number(f.length) : null,
      scale: f.scale ? Number(f.scale) : null,
      required: f.required === 'on',
    }));

    try {
        validateDefinition(name, fields);

        const entity = await entityService.create(
            {name,fields}
        );

        const model = buildModel(entity);
        await model.sync();

        //res.status(201).json({success:true, data:entity});
        res.redirect(`/entities/${name}`);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

exports.showRecords = async (req, res) => {
    try {
        const entity = await entityService.getName(req.params.name);
        if (!entity) return res.status(404).send('Libreria no encontrada');
        // Si el servidor se reinició y no está en memoria, se reconstruye a partir de la entidad de la BD
        let model = registry.get(req.params.name);
        if (!model) {
            model = buildModel(entity);
        }
        const rows = await model.findAll({ order: [['id', 'ASC']] });
        res.status(200).render('dashboard', { 
            page:'/records/home',
            titulo:"Nueva Libreria",
            entity, 
            rows, 
            error: null 
        });
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getEntities = async(req, res) =>{
    try {
        const entities = await entityService.getAll();

        res.status(200).json({success:true, data:entities})
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

exports.records =async(req, res) =>{
    const entity = await entityService.getName(req.params.name);
    const model = registry.get(req.params.name);
    if(!model) return res.status(404).json({success:false,msg:'La entidad no existe'});

    try {
        const data = {};
        for(const key of Object.keys(model.getAttributes())){
            if(['entity_id','createdAt','updatedAt'].includes(key)) continue;
            if(key in req.body) data[key] = req.body[key];
        }

        const record = await model.create(data);
        res.redirect(`/entities/${entity.name}`);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

exports.getRecords = async(req, res)=>{
    try {
        const model = registry.get(req.params.name);
        if(!model) return res.status(404).json({success:false, msg:'La entidad no existe'});
        const records = await model.findAll()
        res.status(200).json({success:true, data:records})
    } catch (error) {
        res.status(400).json({error:error.message});
    }
    
}