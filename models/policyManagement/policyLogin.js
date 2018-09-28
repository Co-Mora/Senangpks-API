const mongoose = require('mongoose');
const Joi = require('joi');

const { quoteSchema } = require('../companyQuote/quote');

const policyLoginSchema = new mongoose.Schema({
   
    loginID: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    companyNumber: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    password: {
        type: String,
        trim: true,
        minlength: 8,
        maxlength: 1024
    },
    companyQuote: {
        type: [quoteSchema],
    }
});

const PolicyLogin = mongoose.model('PolicyLogin', policyLoginSchema);


const policyLoginValidation = (policyLogin) => {

    const schema = {
        companyNumber: Joi.string().min(2).max(255).required(),
        password: Joi.string().min(8).max(1024)
    };

    return Joi.validate(policyLogin, schema);
};


module.exports = {
    PolicyLogin,
    policyLoginValidation,
    policyLoginSchema
};