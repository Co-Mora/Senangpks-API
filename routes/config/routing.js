const express = require('express');
const router = express.Router();


router.get('', (req, res) => {
    if(req.url === '/') {
        res.send("Developed By Omar");
    }
    if(req.url === '/api/v1') {
        res.send("I'm Lost");
    } else {
        res.send("I'm Lost");
    }

});

router.get('/api', (req, res) => {
    res.send("API Work");
});




module.exports = router;