const Joi = require('joi');
const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');


const authUserSchema = new mongoose.Schema({

    partnerID: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
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
    isAdmin: {
        type: Boolean,
        default: false
    },
    optional: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 255
    }

});


authUserSchema.methods.generateAuthToken = function() {

    const token = jwt.sign({partnerID: this.partnerID, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
};

const AuthUser = mongoose.model('AuthUser', authUserSchema);




const authValidation = (auth) => {

    const schema = {
        companyName: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(8).max(255).email().required(),
        phoneNo: Joi.string().min(10).max(255).required(),
        websiteUrl: Joi.string().min(8).max(255).required(),
        optional: Joi.string().min(2).max(255)

    };

    return Joi.validate(auth, schema);
};


module.exports = {
    AuthUser,
    authValidation
};