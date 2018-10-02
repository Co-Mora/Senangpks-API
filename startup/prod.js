const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

module.exports = function (app) {
    app.use(helmet());
    app.use(compression());
    app.use(cors({credentials: true, origin: true}));
    app.options('*', cors());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

};