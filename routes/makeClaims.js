const express = require('express');
const router = express.Router();
const {claimValidation, MakeClaim} = require('../models/makeClaim');
const {Quote} = require('../models/quote');


router.get('/', async (req, res) => {

    const makeClaims = await MakeClaim.find().select(['-_id', '-__v']).sort('companyNumber');
    res.send({result: {makeClaims}});

});


router.get('/:id', async (req, res) => {

    const makeClaim = await MakeClaim.find({claimID: req.params.id}).select(['-_id', '-__v', '-password']).sort('companyNumber');
    
    if(!makeClaim) return res.status(404).send({result: {statusCode: 404}})
    
    res.send({result: {makeClaim}});

});


router.post('/setClaim', async (req, res) => {

    let { error } = claimValidation(req.body);
    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}});

    const quote = await Quote.findOne({companyNumber: req.body.companyNo})
    if(!quote) return res.status(404).send({result: {statusCode: 404}})

    let makeClaim = new MakeClaim({
        companyNo: req.body.companyNo,
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
            additionalCoverage: quote.additionalCoverage,
            basicPremium: quote.basicPremium,
            grandTotalAmount: quote.grandTotalAmount,

        }

    })
    await makeClaim.save();
    res.send({result: makeClaim})

});



module.exports = router;