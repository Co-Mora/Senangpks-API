const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

module.exports = function (app) {
    app.use(helmet());
    app.use(compression());
    app.use(cors({credentials: true, origin: true}));
    app.options('*', cors());
};