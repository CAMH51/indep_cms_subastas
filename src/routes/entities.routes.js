const router = require('express').Router();
const {renderNewEntities, createEntity, getEntities, records, getRecords,showRecords} = require('../controllers/entityController')

//Metodos GET
router.get('/new',              renderNewEntities);
router.get('/:name/records',    getRecords);
router.get('/',                 getEntities);
router.get('/:name',            showRecords);

//Metodos POST
router.post('/',                createEntity);
router.post('/:name/records',   records);


module.exports = router;