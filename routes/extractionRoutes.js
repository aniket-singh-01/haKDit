const express = require('express');
const { processFile } = require('../controllers/extractionController');
const { upload } = require('../config/multerConfig');

const router = express.Router();

router.post('/upload', upload, processFile);

module.exports = router;
