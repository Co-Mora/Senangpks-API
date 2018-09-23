const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {Quote, quoteValidation } = require('../models/quote');



router.get('/', async (req, res) => {
    const quotes  = await Quote.find().select('-_id').sort('industryName');
    res.send(quotes);
});


router.get('/:id', async (req, res) => {
    const quote = await Quote.findById(req.params.id);

    if(!quote) return res.status(404).send("Invalid ID..");
    
    res.send(quote);
})

router.post('/create', async (req, res) => {

    const { error } = quoteValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    let quote = new Quote(_.pick(
        req.body, 
        [
            'industryName',
            'businessType',
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
        res.send(quote)


})


router.put('/:id', async (req, res) => {

    const quote = await Quote.findByIdAndUpdat(req.params.id, {
        industryName: req.body.industryName,
        businessType: req.body.businessType,
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

    if(!quote) return res.status(404).send("Invalid ID..");

    res.send(quote);

})


router.delete('/:id', async(req, res) => {
    
    const quote = await Quote.findByIdAndRemove(req.params.id)
    if(!quote) return res.status(404).send('Invalid ID..');

    res.send(quote);

})





module.exports = router;


// 200 ok
// 400 bad request
// 401 user has not have the authentication to access
// 403 forbidden
// 404 not found
// 500 internal server error