const express = require('express');
const router = express.Router();
const {PolicyRegister, registerValidation} = require('../models/policyRegister')
const _ = require('lodash');

router.get('/', async (req, res) => {

    const registerUsers = await PolicyRegister.find().select('-_id').sort('companyName');
    res.send(registerUsers);

});

router.get('/:id', async (req, res) => {

    const registerUser = await PolicyRegister.findById(req.params.findById);

    if(!registerUser) return res.status(404).send('Invalid ID..')

    res.send(registerUser);

});


router.post('/registerUser', async (req, res) => {

    const { error } = registerValidation(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let registerUser = new PolicyRegister(_.pick(req.body, ['companyName', 'phoneNo']))

    await registerUser.save();

    res.send(registerUser);



});

router.put('/:id', async (req, res) => {


    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const registerUser = await PolicyRegister.findByIdAndUpdate(req.params.id, {

        companyName: req.body.companyName,
        phoneNo: req.body.phoneNo,

    }, {new: true})

    if(!registerUser) return res.status(404).send("Invalid ID..");

    res.send(registerUser);

});


router.delete('/:id', async (req, res) => {

    const registerUser = await PolicyRegister.findByIdAndRemove(req.params.id);

    if(!registerUser) return res.status(404).send("Invalid ID.. ");

    res.send(registerUser);

});


module.exports = router;