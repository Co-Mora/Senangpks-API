const express = require('express');
const router = express.Router();
const {PolicyLogin, policyLoginValidation} = require('../../models/policyManagement/policyLogin');
const {Quote} = require('../../models/companyQuote/quote');
const bcrypt = require('bcrypt');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

router.get('/', async (req, res) => {

    const policyLogin = await PolicyLogin.find().select(['-_id', '-__v', '-password']).sort('companyNumber');
    res.send({result: {policyLogin, count: policyLogin.length}});

});


router.get('/:id', async (req, res) => {

    const policyLogin = await PolicyLogin.find({companyNumber: req.params.id}).select(['-_id', '-__v', '-password']).sort('companyNumber');

    if(!policyLogin) return res.status(404).send({result: {statusCode: 404}});

    res.send({result: {policyLogin}});

});


router.post('/verify', async (req, res) => {

    let { error } = policyLoginValidation(req.body);
    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}});

    let policyLogin = await PolicyLogin.find({companyNumber: req.body.companyNumber});
    if(!policyLogin) return res.status(404).send({result: {statusCode: 404, error: "INVALID_COMPANY_NUMBER"}});

    let validPassword = await bcrypt.compare(req.body.password, policyLogin.password);
    if(!validPassword) return res.status(400).send({result: {statusCode: 404, error: "INVALID_PASSWORD"}})

    res.send({result: {statusCode: 200, message: true}});

});



router.post('/set', async (req, res) => {

    let { error } = policyLoginValidation(req.body);
    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}});

    const quote = await Quote.findOne({companyNumber: req.body.companyNumber});
    if(!quote) return res.status(404).send({result: {statusCode: 404, error: "INVALID COMPANY NUMBER"}});


    let policyLogin = new PolicyLogin({
        companyNumber: req.body.companyNumber,
        password: req.body.password,
        companyQuote: {
            _id: quote._id,
            industryName: quote.industryName,
            businessType: quote.businessType,
            specifyIndustry: quote.specifyIndustry,
            companyName: quote.companyName,
            companyNumber: quote.companyNumber,
            email: quote.email,
            phoneNo: quote.phoneNo,
            address: quote.address,
            typeOfBusiness: quote.typeOfBusiness,
            postalCode: quote.postalCode,
            building: quote.building,
            machineryEquipments: quote.machineryEquipments,
            furnitureFittings: quote.furnitureFittings,
            miscellanous: quote.miscellanous,
            uploadFile: quote.uploadFile,
            additionalCoverage: quote.additionalCoverage,
            basicPremium: quote.basicPremium,
            grandTotalAmount: quote.grandTotalAmount,
            companyQuote: quote.companyQuote
        }

    });

    const salt = await bcrypt.genSalt(10);
    policyLogin.password = await bcrypt.hash(policyLogin.password, salt);

    await policyLogin.save();
    res.send({result: {statusCode: 200, message: "OK"}});

});



router.put('/update/:id', [auth, admin], async(req, res) => {


    const { error } = policyLoginValidation(req.body);

    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}});

    let policyLogin = await PolicyLogin.update({loginID: req.params.id}, {

        companyNumber: req.body.companyNumber,
        password: req.body.password

    }, {new: true});

    if(!policyLogin) return res.status(404).send({result: {statusCode: 404, error: "INVALID loginID"}})


    res.send({result: {statusCode: 200, message: "OK"}});


});


router.delete('/:id', [auth, admin], async (req, res) => {


    const policyLogin = await PolicyLogin.remove({loginID: req.params.id});

    if(!policyLogin) return res.status(404).send({result: {statusCode: 404, error: "INVALID loginID"}})

    res.send({result: policyLogin});

});



module.exports = router;