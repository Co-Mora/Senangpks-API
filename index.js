const express = require('express');
const winston = require('winston');
const app = express();
const router = express.Router();

require('./startup/prod')(app);
require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/db')();

// const {allowCrossDomain} = require('./middleware/cors');
// app.use(allowCrossDomain);

router.get('/api', async (req, res) => {
    res.send("API WORKS");
});

router.get('/api/v1', async (req, res) => {
    res.send("Im Lost");
});


const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`server running on port ${port}....`));

module.exports = server;