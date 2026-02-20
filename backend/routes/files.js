const express = require('express');
const router = express.Router();
const filesController = require('../controllers/filesController');

router.post('/upload', filesController.uploadFile);
router.get('/:userId', filesController.getFiles);

module.exports = router;