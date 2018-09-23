const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {Quote, quoteValidation } = require('../models/quote');

router.get('/', async (req, res) => {
    const quotes  = await Quote.find().select(['-_id', '-__v']).sort('industryName');
    res.send({result: {quotes}});
});


router.get('/:id', async (req, res) => {
    const quote = await Quote.find({companyID: req.params.id}).select(['-_id', '-__v']).sort('industryName');

    if(!quote) return res.status(404).send({result: {statusCode: 404}});
    
    res.send({result: {quote}});
});

router.post('/setQuote', async (req, res) => {

    const { error } = quoteValidation(req.body)
    if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}});

    let quote = new Quote(_.pick(
        req.body, 
        [
            'industryName',
            'businessType',
            'specifyIndustry',
            'companyName',
            'companyNumber',
            'email',
            'phoneNo',
            'address',
            'typeOfBusiness',
            'postalCode',
            'building',
            'machineryEquipments',
            'furnitureFittings',
            'miscellanous',
            'additionalCoverage',
            'basicPremium',
            'grandTotalAmount'
        ]));

        await quote.save();
        res.send({result: quote})


})


router.put('/updateQuote/:id', async (req, res) => {

    const quote = await Quote.update({companyID: req.params.id}, {
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
        additionalCoverage: req.body.additionalCoverage,
        basicPremium: req.body.basicPremium,
        grandTotalAmount: req.body.grandTotalAmount,
    }, {new: true});

    if(!quote) return res.status(404).send({result: {statusCode: 404}});

    res.send({result: quote});

})


router.delete('/:id', async(req, res) => {
    
    const quote = await Quote.remove({companyID: req.params.id})
    if(!quote) return res.status(404).send({resutl: {statusCode: 404}});

    res.send({result: quote});

})


module.exports = router;


// 200 ok
// 400 bad request
// 401 user has not have the authentication to access
// 403 forbidden
// 404 not found
// 500 internal server error