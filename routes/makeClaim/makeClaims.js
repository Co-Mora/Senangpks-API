const express = require('express');
const router = express.Router();
const {claimValidation, MakeClaim} = require('../../models/makeClaim/makeClaim');
const {Quote} = require('../../models/companyQuote/quote');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {

    const makeClaims = await MakeClaim.find().select(['-_id', '-__v', '-password']).sort('companyNo');
    res.send({result: {makeClaims,  count: makeClaims.length}});

});


router.get('/:id', async (req, res) => {

    const makeClaim = await MakeClaim.find({companyNo: req.params.id}).select(['-_id', '-__v', '-password']).sort('companyNo');
    
    if(!makeClaim) return res.status(404).send({result: {statusCode: 404, error: "Not Found"}})
    
    res.send({result: {makeClaim}});

});


router.post('/verify', async (req, res) => {

    let { error } = claimValidation(req.body);
    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}});


    let makeClaim = await MakeClaim.find({companyNo: req.body.companyNo});
    if(!makeClaim) return res.status(404).send({result: {statusCode: 404, error: "INVALID_COMPANY_NUMBER"}})

    let validPassword = await  bcrypt.compare(req.body.password, makeClaim.password);
    if(!validPassword) return res.status(404).send({result: {statusCode: 404, error: "INVALID_PASSWORD"}})

    res.send({result: {statusCode: 200, message: true}});


});

router.post('/setClaim', async (req, res) => {

    let { error } = claimValidation(req.body);
    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}});

    const quote = await Quote.findOne({companyNumber: req.body.companyNo});
    if(!quote) return res.status(404).send({result: {statusCode: 404, error: "INVALID_COMPANY_NUMBER"}})

    let makeClaim = new MakeClaim({
        companyNo: req.body.companyNo,
        password: req.body.password,
        incident: req.body.incident,
        claimCost: req.body.claimCost,
        describeLos: req.body.describeLos,
        incidentDate: req.body.incidentDate,
        isDataProtected: req.body.isDataProtected,
        fullName: req.body.fullName,
        icNumber: req.body.icNumber,
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
            coverNoteFile: quote.coverNoteFile
        }

    });

    let salt = await bcrypt.genSalt(10);
    makeClaim.password = await bcrypt.hash(makeClaim.password, salt);

    await makeClaim.save();
    res.send({result: {statusCode: 200, message: "OK"}})

});



router.put('/updateClaim/:id', async(req, res) => {


    const { error } = claimValidation(req.body);

    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}});

    let makeClaim = await MakeClaim.update({claimID: req.params.id}, {

        companyNo: req.body.companyNo,
        password: req.body.password,
        incident: req.body.incident,
        claimCost: req.body.claimCost,
        describeLos: req.body.describeLos,
        incidentDate: req.body.incidentDate,
        isDataProtected: req.body.isDataProtected,
        fullName: req.body.fullName,
        icNumber: req.body.icNumber,

    }, {new: true});

    if(!makeClaim) return res.status(404).send({result: {statusCode: 404, error: "INVALID claimID"}})


    res.send({result: makeClaim});


});


router.delete('/:id', async (req, res) => {


    const makeClaim = await MakeClaim.remove({claimID: req.params.id});

    if(!makeClaim) return res.status(404).send({result: {statusCode: 404, error: "INVALID claimID"}})

    res.send({result: makeClaim});

});



module.exports = router;