const express = require('express');
const router = express.Router();
const {Partnership} = require('../../models/partnership/partnership');
const {AuthUser} = require('../../models/authorizedUser/authUser');
const {PartnerQuote, quoteValidation} = require('../../models/partnership/partnershipQuote');
const {PartnershipClaim, claimValidation} = require('../../models/partnership/partnershipClaim');
const auth = require('../../middleware/auth');
const {PartnershipPolicy, partnerPolicyValidation} = require('../../models/partnership/partnershipPolicy');
const _ = require('lodash');

//5baf291087ace70b1eba2101
router.get('/:id', async (req, res) => {

    const partnership = await Partnership.find({partnerID: req.params.id}).select(['-_id', '-__v']).sort('companyName');
    if(!partnership) return res.status(404).send({result: {statusCode: 404, error: "Not Found"}});

    const partnerQuote = await PartnerQuote.find({partnerID: req.params.id}).select(['-_id', '-__v']);
    if(!partnerQuote) return res.status(404).send({result: {statusCode: 404, error: "Not Found"}});

    const partnershipClaim = await PartnershipClaim.find({partnerID: req.params.id}).select(['-_id', '-__v'])
    if(!partnershipClaim) return res.status(404).send({result: {statusCode: 404, error: "Not Found"}});


    const partnershipPolicy = await PartnershipPolicy.find({partnerID: req.params.id}).select(['-_id', '-__v'])
    if(!partnershipPolicy) return res.status(404).send({result: {statusCode: 404, error: "Not Found"}});

    for(let i = 0; i < partnerQuote.length; i++) {

        partnership[0].partnerQuote.push(partnerQuote[i]);
        partnership[0].partnerClaim.push(partnershipClaim[i]);
        partnership[0].partnerRegisterPolicy.push(partnershipPolicy[i])
    }




    res.send({result: {partnership: partnership}});

});


router.post('/me/:id', auth, async (req, res) => {


    const authUser = await AuthUser.findOne({partnerID: req.params.id});
    if(!authUser) return res.status(404).send({result: {statusCode: 404, error: "INVALID_API_KEY"}});

    let partnership = await Partnership.findOne({partnerID: req.params.id});
    if(partnership) return res.status(400).send({result: {statusCode: 400, error: "PARTNER_ALREADY_EXIST"}});


    partnership = new Partnership({
        partnerID: req.params.id,
        companyName: authUser.email,
        email: authUser.email,
        phoneNo: authUser.phoneNo,
        websiteUrl: authUser.websiteUrl,

    });

    await partnership.save();
    res.send({result: {statusCode: 200, message: "OK"}})

});

router.post('/me/:id/quote', auth, async (req, res) => {

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


router.post('/me/:id/claim/:companyNo', auth, async (req, res) => {

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
    res.send({result: {statusCode: 200, message: "OK", partnership: partnerClaim}})

});


router.post('/me/:id/policy', auth, async (req, res) => {

    let { error } = partnerPolicyValidation(req.body);
    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}});


    const partnership = await Partnership.findOne({partnerID: req.params.id});
    if (!partnership) return res.status(404).send({result: {statusCode: 404, error: "INVALID_API_KEY"}});



    let partnershipPolicy = new PartnershipPolicy(_.pick(req.body, ['companyName', 'phoneNo', 'email', 'uploadFile']));


    await partnershipPolicy.save();
    res.send({result: {statusCode: 200, message: "OK"}})

});







module.exports = router;