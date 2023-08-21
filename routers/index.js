const router = require('express').Router();

// Import routes from /notes
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;