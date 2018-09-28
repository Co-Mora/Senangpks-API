const express = require('express');
const router = express.Router();
const {Partnership} = require('../../models/partnership/partnership');
const {AuthUser} = require('../../models/authorizedUser/authUser');
const {PartnerQuote, quoteValidation} = require('../../models/partnership/partnershipQuote');
const {PartnershipClaim, claimValidation} = require('../../models/partnership/partnershipClaim');

const {PartnershipPolicy, partnerPolicyValidation} = require('../../models/partnership/partnershipPolicy');
const _ = require('lodash');


router.get('/', async (req, res) => {

    const partnership = await Partnership.find().select(['-_id', '-__v']).sort('companyName');
    res.send({result: {partnership,  count: partnership.length}});

});


router.get('/:id', async (req, res) => {

    const partnership = await Partnership.find({partnerID: req.params.id}).select(['-_id', '-__v']).sort('companyName').populate("partnershipCustomers")
        .exec(function(err, partnershipQuote) {
            if(err) console.log(err);
            console.log('The partnership API_KEY is %s', partnershipQuote.partnershipCustomers.partnerID);

        });

    if(!partnership) return res.status(404).send({result: {statusCode: 404, error: "Not Found"}});

    res.send({result: {partnership}});

});


router.post('/me/:id', async (req, res) => {


    const authUser = await AuthUser.findOne({partnerID: req.params.id});
    if(!authUser) return res.status(404).send({result: {statusCode: 404, error: "INVALID_API_KEY"}});

    let partnership = await partnership.findOne({partnerID: req.params.id});
    if(partnership) return res.status(400).send({result: {statusCode: 400, error: "PARTNER_ALREADY_EXIST"}});


    partnership = new partnership({
        partnerID: req.params.id,
        email: authUser.email,
        phoneNo: authUser.phoneNo,
        websiteUrl: authUser.websiteUrl,

    });

    await partnership.save();
    res.send({result: {statusCode: 200, message: "OK"}})

});

router.post('/me/:id/quote', async (req, res) => {

    let { error } = quoteValidation(req.body);
    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}});


    const partnership = await Partnership.findOne({partnerID: req.params.id});
    if (!partnership) return res.status(404).send({result: {statusCode: 404, error: "INVALID_API_KEY"}});



    let partnerQuote = new PartnerQuote({

        partnerID: partnership.partnerID,
        industryName: req.body.industryName,
        businessType: req.body.businessType,
        specifyIndustry: req.body.specifyIndustry,
        companyName: req.body.companyName,
        companyNumber: req.body.companyNumber,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        address: req.body.address,
        typeOfBusiness: req.body.typeOfBusiness,
        postalCode: req.body.postalCode,
        building: req.body.building,
        machineryEquipments: req.body.machineryEquipments,
        furnitureFittings: req.body.furnitureFittings,
        miscellanous: req.body.miscellanous,
        uploadFile: req.body.uploadFile,
        additionalCoverage: req.body.additionalCoverage,
        basicPremium: req.body.basicPremium,
        grandTotalAmount: req.body.grandTotalAmount,
        coverNoteFile: req.body.coverNoteFile

    });


    await partnerQuote.save();
    res.send({result: {statusCode: 200, message: "OK"}})

});


router.post('/me/:id/claim/:companyNo', async (req, res) => {

    let { error } = claimValidation(req.body);
    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}});


    const partnership = await Partnership.findOne({partnerID: req.params.id});
    if (!partnership) return res.status(404).send({result: {statusCode: 404, error: "INVALID_API_KEY"}});

    const partnershipQuote = await PartnerQuote.findOne({companyNumber: req.params.companyNo});
    if (!partnershipQuote) return res.status(404).send({result: {statusCode: 404, error: "INVALID_COMPANY_NO"}});


    let partnerClaim = new PartnershipClaim({
        partnerID: partnership.partnerID,
        companyNo: req.body.companyNo,
        incident: req.body.incident,
        claimCost: req.body.claimCost,
        describeLos: req.body.describeLos,
        incidentDate: req.body.incidentDate,
        isDataProtected: req.body.isDataProtected,
        fullName: req.body.fullName,
        icNumber: req.body.icNumber,
    });


    await partnerClaim.save();
    res.send({result: {statusCode: 200, message: "OK"}})

});


router.post('/me/:id/policy', async (req, res) => {

    let { error } = partnerPolicyValidation(req.body);
    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}});


    const partnership = await Partnership.findOne({partnerID: req.params.id});
    if (!partnership) return res.status(404).send({result: {statusCode: 404, error: "INVALID_API_KEY"}});



    let partnershipPolicy = new PartnershipPolicy(_.pick(req.body, ['companyName', 'phoneNo', 'email', 'uploadFile']));


    await partnershipPolicy.save();
    res.send({result: {statusCode: 200, message: "OK"}})

});







module.exports = router;