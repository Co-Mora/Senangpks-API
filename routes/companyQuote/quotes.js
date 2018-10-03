const express = require('express');
const router = express.Router();
const _ = require('lodash');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const {Quote, quoteValidation } = require('../../models/companyQuote/quote');
const {MakeClaim} = require('../../models/makeClaim/makeClaim');

const validateObjectId = require('../../middleware/validateObjectId');

router.get('/', async (req, res) => {


    const quotes  = await Quote.find().select(['-_id', '-__v']).sort('industryName');

    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send({result: {quotes , count: quotes.length}});
});



router.get('/:id', async (req, res) => {



    const quotes = await Quote.findOne({companyNumber: req.params.id}).select(['-_id', '-__v']).sort('industryName');
    if(!quotes) return res.status(404).send({result: {statusCode: 404}});

    const makeClaim = await MakeClaim.find({companyNo: req.params.id}).select(['-_id', '-__v']).limit(10);
    if(!makeClaim) return res.status(404).send({result: {statusCode: 404}});

    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send({result: {quotes}});
});

router.post('/create', async (req, res) => {


    const { error } = quoteValidation(req.body);
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
            'uploadFile',
            'additionalCoverage',
            'basicPremium',
            'grandTotalAmount',
            'coverNoteFile'
        ]));

        await quote.save();
        res.send({result: quote});




});


// router.post('/create/step2', async (req, res) => {
//
//     const { error } = quoteValidation(req.body);
//     if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}});
//
//     const quote = await Quote.findOne({companyNumber: req.body.companyNumber});
//     if(!quote) return res.status(404).send({result: {statusCode: 404, error: "INVALID_COMPANY_NUMBER"}})
//
//     await Quote.update({companyNumber: req.body.companyNumber}, {
//
//         industryName: quote.industryName,
//         businessType: quote.businessType,
//         specifyIndustry: quote.specifyIndustry,
//         companyName: quote.companyName,
//         companyNumber: quote.companyNumber,
//         email: quote.email,
//         phoneNo: quote.phoneNo,
//         address: quote.address,
//         typeOfBusiness:quote.typeOfBusiness,
//         postalCode: quote.postalCode,
//         building: req.body.building,
//         machineryEquipments: req.body.machineryEquipments,
//         furnitureFittings: req.body.furnitureFittings,
//         miscellanous: req.body.miscellanous,
//         uploadFile: req.body.uploadFile,
//
//     }, {new: true});
//
//
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.send({result: quote})
//
//
// });
//
// router.post('/create/step3', async (req, res) => {
//
//
//     const { error } = quoteValidation(req.body);
//     if(error) return res.status(400).send({result: {statusCode: 400, errors: error.details[0].message}});
//
//     const quote = await Quote.findOne({companyNumber: req.body.companyNumber});
//     if(!quote) return res.status(404).send({result: {statusCode: 404, error: "INVALID_COMPANY_NUMBER"}})
//
//     await Quote.update({companyNumber: req.body.companyNumber}, {
//
//         industryName: quote.industryName,
//         businessType: quote.businessType,
//         specifyIndustry: quote.specifyIndustry,
//         companyName: quote.companyName,
//         companyNumber: quote.companyNumber,
//         email: quote.email,
//         phoneNo: quote.phoneNo,
//         address: quote.address,
//         typeOfBusiness:quote.typeOfBusiness,
//         postalCode: quote.postalCode,
//         building: quote.building,
//         machineryEquipments: quote.machineryEquipments,
//         furnitureFittings: quote.furnitureFittings,
//         miscellanous:quote.miscellanous,
//         uploadFile: quote.uploadFile,
//         additionalCoverage: req.body.additionalCoverage,
//         basicPremium: req.body.basicPremium,
//         grandTotalAmount: req.body.grandTotalAmount,
//         coverNoteFile: req.body.coverNoteFile
//
//     }, {new: true});
//
//     res.send({result: quote})
//
//
// });
//





router.put('/update/:id', [auth, admin], async (req, res) => {


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
        uploadFile: req.body.uploadFile,
        additionalCoverage: req.body.additionalCoverage,
        basicPremium: req.body.basicPremium,
        grandTotalAmount: req.body.grandTotalAmount,
        coverNoteFile: req.body.coverNoteFile
    }, {new: true});

    if(!quote) return res.status(404).send({result: {statusCode: 404}});

    res.send({result: {statusCode: 200, message: "OK"}});

});


router.delete('/:id', [auth, admin, validateObjectId], async(req, res) => {


    const quote = await Quote.remove({companyID: req.params.id});
    if(!quote) return res.status(404).send({result: {statusCode: 404}});

    res.send({result: quote});

});


module.exports = router;


// 200 ok
// 400 bad request
// 401 user has not have the authentication to access
// 403 forbidden
// 404 not found
// 500 internal server error