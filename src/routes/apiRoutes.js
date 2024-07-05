const express = require('express');
const router = express.Router();
const { handlePostRequest } = require('../controllers/apiController');
const validateRequest = require('../middleware/validateRequest');

router.post('/', validateRequest, handlePostRequest);

module.exports = router;
