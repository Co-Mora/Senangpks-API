const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Developed By Omar");
});

router.get('/api', (req, res) => {
    res.send("API Work");
});

router.get('api/v1', (req, res) => {
    res.send("I'm Lost");
});


module.exports = router;