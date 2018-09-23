const express = require('express');
const router = express.Router();
const {PolicyRegister, registerValidation} = require('../models/policyRegister')
const _ = require('lodash');

router.get('/', async (req, res) => {

    const registerUsers = await PolicyRegister.find().select(['-_id', '-__v']).sort('companyName');
    res.send({result: {registerUsers}});

});

router.get('/:id', async (req, res) => {

    const registerUser = await PolicyRegister.find({registerID: req.params.id});

    if(!registerUser) return res.status(404).send({result: {statusCode: 404}})

    res.send({result: {registerUser}});

});


router.post('/setUser', async (req, res) => {

    const { error } = registerValidation(req.body);

    if(error) return res.status(400).send({resutl: {statusCode: 400, errors: error.details[0].message}});

    let registerUser = new PolicyRegister(_.pick(req.body, ['companyName', 'phoneNo', 'email']))

    await registerUser.save();
    res.send({result: registerUser});



});

router.put('/updateUser/:id', async (req, res) => {


    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send({resutl: {statusCode: 400, errors: error.details[0].message}});

    const registerUser = await PolicyRegister.update({registerID: req.params.id}, {

        companyName: req.body.companyName,
        phoneNo: req.body.phoneNo,

    }, {new: true})

    if(!registerUser) return res.status(404).send({result: {statusCode: 404}});

    res.send({result: registerUser});

});


router.delete('/:id', async (req, res) => {

    const registerUser = await PolicyRegister.remove({companyID: req.params.id});

    if(!registerUser) return res.status(404).send({result: {statusCode: 404}});

    res.send({result: registerUser});

});


module.exports = router;