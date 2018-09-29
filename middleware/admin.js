module.exports = (req, res, next) => {
    if(!req.authUser.isAdmin) {
        return res.status(403).send({result: {statusCode: 403, message: "FORBIDDEN"}})
    }
    next();
};