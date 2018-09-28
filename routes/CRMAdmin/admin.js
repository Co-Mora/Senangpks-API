const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const {Admin, adminValidation} = require('../../models/CRMAdmin/admin');


router.get('/', async (req, res) => {

    const admins = await Admin.find().select(['-__v, -_id']).sort("username");
    res.send({result: {admins}});

});

router.get('/:id', async (req, res) => {

    const admin = await Admin.find({adminID: req.params.id}).select(['-__v, -_id']).sort('username');

    if(!admin) return res.status(404).send({result: {statusCode: 404, error: "INVALID_ADMIN_ID"}});

    res.send({result: {admin}});

});


router.post('/user/verify', async (req, res) => {

    let {error} = adminValidation(req.body);
    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}})

    let admin = await Admin.find({username: req.body.username});
    if(!admin) return res.status(404).send({result: {statusCode: 404, error: "INVALID_USERNAME"}});

    let validPassword = await bcrypt.compare(req.body.password, admin.password);
    if(!validPassword) return res.status(400).send({result: {statusCode: 404, error: "INVALID_PASSWORD"}})

    res.send({result: {statusCode: 200, message: true}});

});



router.post('/addUser', async (req, res) => {

    let {error} = adminValidation(req.body);
    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}})

    let admin = await Admin.find({username: req.body.username});
    if(!admin) return res.status(400).send({result: {statusCode: 400, error: "USERNAME_EXIST_ALREADY"}});

    admin = new Admin({
        username: req.body.username,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(req.body.password, salt);

    await admin.save();
    res.send({result: {statusCode: 200, message: "OK"}});

});


router.put('/updateUser', async (req, res) => {

    let {error} = adminValidation(req.body);
    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}})

});


router.delete('/:id', async (req, res) => {

    const admin = await Admin.findByIdAndRemove(req.params.id);

    if(!admin) return res.status(404).send({result: {statusCode: 404, error: "INVALID_ID"}})

    res.send({result: {statusCode: 200, message: "OK"}});
});
