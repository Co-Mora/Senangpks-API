const mongoose = require('mongoose');
const Joi = require('joi');

const quoteSchema = new mongoose.Schema({
    
    companyID: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    industryName: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    businessType: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    specifyIndustry: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    companyName: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    companyNumber: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 255
    },
    email: {
        type: String,
        trim: true,
        minlength: 8,
        maxlength: 50
    },
    phoneNo: {
        type: String,
        trim: true,
        minlength: 10,
        maxlength: 20,
    },
    address: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    typeOfBusiness: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255,
    },
    postalCode: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 20,
    },
    building: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 255,
    },
    machineryEquipments: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 255,
    },
    furnitureFittings: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 255,
    },
    miscellanous: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 255,
    },
    uploadFile: {
        type: String,
        trim: true,
    },
    additionalCoverage: [{
        indBuss : String,
        price: String,
    }],
    basicPremium: {
        type: String,
        trim: true,
    },
    grandTotalAmount: {
        type: String,
        trim: true
    },
    coverNoteFile: {
        type: String,
        trim: true,
    }

});


const Quote = mongoose.model('Quote', quoteSchema);

const quoteValidation = (quote) => {

    const schema = {
        industryName: Joi.string().min(2).max(255),
        businessType: Joi.string().min(2).max(255),
        specifyIndustry: Joi.string().min(2).max(255),
        companyName:  Joi.string().min(2).max(255),
        companyNumber:  Joi.string().min(2).max(255),
        email:  Joi.string().min(8).max(50).email(),
        phoneNo:  Joi.string().min(10).max(20),
        address:  Joi.string().min(5).max(255),
        typeOfBusiness:  Joi.string().min(2).max(255),
        postalCode:  Joi.string().min(2).max(255),
        building:  Joi.string().min(2).max(255),
        machineryEquipments:  Joi.string().min(2).max(255),
        furnitureFittings:  Joi.string().min(2).max(255),
        miscellanous:  Joi.string().min(2).max(255),
        uploadFile: Joi.string().min(2).max(255),
        additionalCoverage: Joi.array(),
        basicPremium:  Joi.string().min(2).max(255),
        grandTotalAmount:  Joi.string().min(2).max(255),
        coverNoteFile:  Joi.string()
    };

    return Joi.validate(quote, schema);

};


module.exports = {
    Quote,
    quoteValidation,
    quoteSchema
};