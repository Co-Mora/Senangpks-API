const mongoose = require('mongoose');
const {PartnerQuote} = require('./partnershipQuote');


const partnershipSchema = new mongoose.Schema({

    companyID: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    partnerID: {
        type: String,
        required: true,
        trim: true,
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 255
    },
    phoneNo: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 255
    },
    websiteUrl: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 255
    },
    partnershipCustomers: [PartnerQuote]

});


const Partnership = mongoose.model('Partnership', partnershipSchema);

module.exports = {
    Partnership,
};