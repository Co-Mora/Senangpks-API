const express = require('express');
const winston = require('winston');
const app = express();

require('./startup/routes')(app);
require('./startup/logging')();
require('./startup/db')();


const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    winston.info(`server running on port ${port}....`);
});


module.exports = server;