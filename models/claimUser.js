const mongoose = require('mongoose');
const Joi = require('joi');

const ClaimUser = mongoose.model('ClaimUser', new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
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
}));


const userValidation = (claim) => {

    const schema = {

        companyNumber: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(8).max(255).required(),
    }

    return Joi.validate(claim, schema);

}


module.exports = {
    ClaimUser,
    userValidation
};