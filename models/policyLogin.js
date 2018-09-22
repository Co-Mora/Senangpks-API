const mongoose = require('mongoose');
const Joi = require('joi');

const { quoteSchema } = require('./quote');

const policyLoginSchema = new mongoose.Schema({
    loginID: {
        type: mongoose.Types.ObjectId()
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
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 1024
    },
    quote: {
        type: quoteSchema,
        required: true
    }
})

const PolicyLogin = mongoose.model('PolicyLogin', policyLoginSchema);


const policyLoginValidation = (policyLogin) => {

    const schema = {
        companyNumber: Joi.string().min(2).max(255).required(),
        password: Joi.string().min(8).max(1024).required()
    }

    return Joi.validate(policyLogin, schema);
}


module.exports = {
    PolicyLogin,
    policyLoginValidation,
    policyLoginSchema
}