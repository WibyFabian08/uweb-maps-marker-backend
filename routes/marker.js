const express = require('express');
const router = express.Router();

const markerController = require('../contollers/markerController');

router.get('/', markerController.getMarkers);
router.post('/create', markerController.createMarker);

module.exports = router;