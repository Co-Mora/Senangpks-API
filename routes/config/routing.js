const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("API WORKS");
});

router.get('/v1', (req, res) => {
    res.send("Im Lost");
});


module.exports = router;