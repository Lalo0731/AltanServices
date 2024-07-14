const express = require('express');

const router = express.Router();

const { handlePostRequest } = require('../controllers/apiController');
const { insertStore } = require('../controllers/storeController');

const { validateApi, validateStore } = require('../middleware/validateRequest');

router.post('/recharge', validateApi, handlePostRequest);
router.post('/store', validateStore, insertStore);

module.exports = router;
