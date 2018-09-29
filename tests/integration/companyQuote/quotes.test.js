const request = require('supertest');
const {Quote}  = require('../../../models/companyQuote/quote');
let server;

describe('/api/v1/quotes', () => {

    beforeEach(() => server = require('../../../index'));
    afterEach(async () => {
        server.close()
        await Quote.remove({})

    });

    describe('GET //', () => {
        it('should return all quotes', async () => {

            let quote = await Quote.collection.insertMany([{
                industryName: "hello",
                businessType:"hello Industry",
                specifyIndustry: "hello Industry",
                companyName: "hello Industry",
                companyNumber: "hello Industry",
                email: "hello Industry",
                phoneNo: "hello Industry",
                address: "hello Industry",
                typeOfBusiness: "hello Industry",
                postalCode: "hello Industry",
                building: "hello Industry",
                machineryEquipments:"hello Industry",
                furnitureFittings: "hello Industry",
                miscellanous: "hello Industry",
                uploadFile: "hello Industry",
                additionalCoverage: "hello Industry",
                basicPremium: "hello Industry",
                grandTotalAmount: "hello Industry",
                coverNoteFile: "hello Industry",
            }]);

            const res = await request(server).get('/api/v1/quotes');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe();

        });
    });


    describe('GET //:id', () => {
        it('should should return an object follow by id', async () => {

            let quote = new Quote({
                industryName: "aghnedff",
                businessType:"hello Industry",
                specifyIndustry: "hello Industry",
                companyName: "DFFG310",
                companyNumber: "DFFG310",
                email: "hello Industry",
                phoneNo: "hello Industry",
                address: "hello Industry",
                typeOfBusiness: "hello Industry",
                postalCode: "hello Industry",
                building: "hello Industry",
                machineryEquipments:"hello Industry",
                furnitureFittings: "hello Industry",
                miscellanous: "hello Industry",
                uploadFile: "hello Industry",
                "additionalCoverage": [{
                    "indBuss": "redfd",
                    "price": "dsfgsfdg"
                }],
                basicPremium: "hello Industry",
                grandTotalAmount: "hello Industry",
                coverNoteFile: "hello Industry",
            })

            await quote.save();

            const res = await request(server).get('/api/v1/quotes/' + quote.companyNumber);
            expect(res.status).toBe(200);
        });



        it('should should return an object follow by id', async () => {

            const res = await request(server).delete('/api/v1/quotes/1');
            expect(res.status).toBe(401);
        });

    });

});



