
const express = require('express');
const helmet = require('helmet');


const quotes = require('../routes/companyQuote/quotes');
const registerPolicies = require('../routes/policyManagement/policyRegisters');
const makeClaims = require('../routes/makeClaim/makeClaims');
const policyLogins = require('../routes/policyManagement/policyLogins');
const authUsers = require('../routes/authorizedUser/authUsers');
const partnership = require('../routes/partnership/partnership');


module.exports = function (app) {

    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use('/api/v1/quotes', quotes);
    app.use('/api/v1/registerPolicy', registerPolicies);
    app.use('/api/v1/makeClaim', makeClaims);
    app.use('/api/v1/loginPolicy', policyLogins);
    app.use('/api/v1/auth', authUsers);
    app.use('/api/v1/partners', partnership);

};