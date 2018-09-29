const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const {Admin, adminValidation} = require('../../models/CRMAdmin/admin');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

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



router.post('/add', async (req, res) => {

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


router.put('/update/:id', [auth, admin], async (req, res) => {

    let {error} = adminValidation(req.body);
    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}})

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);


    let admin = await  Admin.update({adminID: req.params.id}, {
        username: req.body.username,
        password: req.body.password,
    }, {new: true});


    res.send({result: {statusCode: 200, message: "UPDATED", newUser: admin}});


});


router.delete('/:id', [auth, admin], async (req, res) => {

    const admin = await Admin.remove({adminID: req.params.id});

    if(!admin) return res.status(404).send({result: {statusCode: 404, error: "INVALID_ID"}})

    res.send({result: {statusCode: 200, message: "OK"}});
});
