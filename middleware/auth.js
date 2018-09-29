const config = require('config');
const jwt = require('jsonwebtoken');



function auth(req, res, next) {

    let token = req.header('x-auth-token');

    if(!token) return res.status(401).send({result: {statusCode: 401, error: "ACCESS_DENIED"}});

    try {

        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.authUser = decoded;
        next();

    } catch (ex) {
        res.status(400).send({result: {statusCode: 400, error: "INVALID_TOKEN"}})
    }

}


module.exports = auth;