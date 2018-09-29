const { AuthUser } = require('../../../../models/authorizedUser/authUser')
const jwt = require('jsonwebtoken');
const config = require('config')
const mongoose = require('mongoose')

describe('generateAuthToken', () => {
    it('should return valid JWT ', () => {

        const payload = {_id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true}
        const authUser =new AuthUser(payload);
        const toekn = authUser.generateAuthToken();
        const decoded = jwt.verify(toekn, config.get('jwtPrivateKey'))
        expect(decoded).toMatchObject(payload)
    })
})