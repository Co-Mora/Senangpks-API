const mongoose = require('mongoose');
const {partnerQuoteSchema} = require('./partnershipQuote');
const {partnershipClaimSchema} = require('./partnershipClaim');
const {partnershipPolicySchema} = require('./partnershipPolicy');


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
    partnerQuote: {
        type: [partnerQuoteSchema]
    },
    partnerClaim: {
        type: [partnershipClaimSchema]
    },
    partnerRegisterPolicy: {
        type: [partnershipPolicySchema]
    }

});


const Partnership = mongoose.model('Partnership', partnershipSchema);

module.exports = {
    Partnership,
};