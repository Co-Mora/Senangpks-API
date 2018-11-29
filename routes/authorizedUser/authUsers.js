const express = require('express');
const router = express.Router();
const _ = require('lodash');

const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

const {AuthUser, authValidation} = require('../../models/authorizedUser/authUser');


router.get('/me', auth, async (req, res) => {

    const authUser = await AuthUser.findOne(req.authUser._id).select(['-_id', '-__v']);
    res.send({result: authUser});

});


router.post('/', async (req, res) => {

    const { error } = authValidation(req.body);
    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}});
    let authUser = await AuthUser.findOne({email: req.body.email});
    if(authUser) return res.status(400).send({result: {statusCode: 400, errors: "Partner Already Exist "}});

    authUser = new AuthUser(_.pick(req.body, ['companyName', 'email', 'phoneNo', 'websiteUrl', 'optional']));

    await authUser.save();

    const token = authUser.generateAuthToken();

    res.header('x-auth-token', token).send({result: {"x-auth-token": token, "API_KEY": authUser.partnerID}});

});


router.put('/:id', [auth, admin], async (req, res) => {

    const { error } = authValidation(req.body);
    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}});

    let authUser = await AuthUser.update({
        companyName: req.body.companyName,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        websiteUrl: req.body.websiteUrl
    }, {new: true});

    res.send({result: {statusCode: 200, message: "Updated Successfully"}});

});



module.exports = router;


// 200 ok
// 400 bad request
// 401 user has not have the authentication to access
// 403 forbidden
// 404 not found
// 500 internal server error