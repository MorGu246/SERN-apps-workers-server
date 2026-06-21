const express = require('express');
const router = express.Router();

const entrance_R = require('./entrance_R');
router.use('/ENT',[],entrance_R);
const exit_R = require('./exit_R');
router.use('/EXT',[],exit_R);
const reports_R = require('./reports_R');
router.use('/REP', [], reports_R);

module.exports = router;