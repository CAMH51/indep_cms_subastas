const router = require('express').Router();

router.use('/entities',require('./entities.routes'));
router.use('/dashboard',require('./dahsboard.routes'));

module.exports = router;