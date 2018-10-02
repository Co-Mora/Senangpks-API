const express = require('express');
const winston = require('winston');
const app = express();

require('./startup/routes')(app);
require('./startup/prod')(app);
require('./startup/logging')();
require('./startup/db')();
const {allowCrossDomain} = require('./middleware/cors');

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(allowCrossDomain);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`server running on port ${port}....`));

module.exports = server;