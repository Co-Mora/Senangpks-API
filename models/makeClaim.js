const mongoose = require('mongoose');
const Joi = require('joi');

const {quoteSchema} = require('./quote')

const MakeClaim = mongoose.model('MakeClaim', new mongoose.Schema({

    claimID: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    companyNo: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    incident: {
        type: String,
        required: true,
        trim: true
    },
    claimCost: {
        type: String,
        required: true,
        trim: true,
    },
    describeLos: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    incidentDate: {
        type: String,
        required: true,
        default: "2019"
    },
    isDataProtected: {
        type: Boolean,
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    icNumber: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    companyQuote: {
        type: [quoteSchema],
    }
}));


const claimValidation = (claim) => {

    const schema = {

        companyNo: Joi.string().min(5).max(255).required(),
        incident: Joi.string().min(5).max(255).required(),
        claimCost: Joi.string().min(5).max(255).required(),
        describeLos: Joi.string().min(5).max(255).required(),
        incidentDate: Joi.string().required(),
        isDataProtected: Joi.boolean().required(),
        fullName: Joi.string().min(5).max(255).required(),
        icNumber: Joi.string().min(5).max(255).required(),
    }

    return Joi.validate(claim, schema);

}


module.exports = {
    MakeClaim,
    claimValidation
};