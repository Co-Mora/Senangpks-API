const mongoose = require('mongoose');
const Joi = require('joi');

const {quoteSchema} = require('./quote')

const MakeClaim = mongoose.model('MakeClaim', new mongoose.Schema({

    claimID: {
        type: mongoose.Types.ObjectId()
    },
    companyNumber: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255

    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
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
        type: Date,
        required: true,
        default: Date.now
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
    quote: {
        type: quoteSchema
    }

}));


const claimValidation = (claim) => {

    const schema = {

        companyNumber: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(8).max(255).required(),
        incident: Joi.string().min(5).max(255).required(),
        claimCost: Joi.string().min(5).max(255).required(),
        describeLos: Joi.string().min(5).max(255).required(),
        incidentDate: Joi.Date().required(),
        isDataProtected: Joi.Boolean().required(),
        fullName: Joi.string().min(5).max(255).required(),
        icNumber: Joi.string().min(5).max(255).required(),

    }

    return Joi.validate(claim, schema);

}


module.exports = {
    MakeClaim,
    claimValidation
};