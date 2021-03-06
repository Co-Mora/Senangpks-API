
const express = require('express');


const quotes = require('../routes/companyQuote/quotes');
const registerPolicies = require('../routes/policyManagement/policyRegisters');
const makeClaims = require('../routes/makeClaim/makeClaims');
const policyLogins = require('../routes/policyManagement/policyLogins');
const authUsers = require('../routes/authorizedUser/authUsers');
const partnership = require('../routes/partnership/partnership');
const admins = require('../routes/CRMAdmin/admin');
const routing = require('../routes/config/routing');


module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use('/', routing);
    app.use('/api/v1/quotes', quotes);
    app.use('/api/v1/register/policy', registerPolicies);
    app.use('/api/v1/claim', makeClaims);
    app.use('/api/v1/login/policy', policyLogins);
    app.use('/api/v1/auth', authUsers);
    app.use('/api/v1/partners', partnership);
    app.use('/api/v1/admin', admins);

};