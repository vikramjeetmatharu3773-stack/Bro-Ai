const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/chat', aiController.chat);
router.post('/voice-to-text', aiController.voiceToText);
router.post('/text-to-voice', aiController.textToVoice);
router.post('/generate-image', aiController.generateImage);

module.exports = router;