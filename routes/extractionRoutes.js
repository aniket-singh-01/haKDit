const express = require('express');
const { processImageFile, processPDFFile } = require('../controllers');
const { upload } = require('../config/multerConfig');

const router = express.Router();

router.post('/upload/pdf', upload, processPDFFile);
router.post('/upload/img', upload, processImageFile);

module.exports = router;
