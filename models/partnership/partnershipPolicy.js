const mongoose = require('mongoose');
const Joi = require('joi');


const partnershipPolicySchema = new mongoose.Schema({

    registerID: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    companyName: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    phoneNo: {
        type: String,
        trim: true,
        required: true,
        minlength: 10,
        minlength: 20
    },
    email: {
        type: String,
        trim: true,
        required: true,
        minlength: 5,
        minlength: 255
    },
    uploadFile: {
        type: String,
        trim: true,
        required: true
    },



});

const PartnershipPolicy = mongoose.model('PartnershipPolicy', partnershipPolicySchema);

const  partnerPolicyValidation = (register) => {

    const schema = {
        companyName: Joi.string().min(2).max(255).required(),
        phoneNo: Joi.string().min(10).max(20).required(),
        email: Joi.string().min(5).max(255).email().required()
        uploadFile: Joi.string().required()
    };

    return Joi.validate(register, schema);

};


module.exports = {
    PartnershipPolicy,
    partnershipPolicySchema,
    partnerPolicyValidation
};