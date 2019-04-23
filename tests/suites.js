import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';

let testRailApi;
const uri = '//index.php?/api/v2/';

let testData = [
    { 'id': 1, 'name': 'Suite 1' }
];

describe('Get nock data - suites', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .get(uri + 'get_suite/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_suites/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'add_suite/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'update_suite/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'delete_suite/1')
    .reply(200, testData);

    it('getSuite', async () => {
        expect(await testRailApi.getSuite(1)).to.deep.equal(testData);
    });
    it('getSuites', async () => {
        expect(await testRailApi.getSuites(1)).to.deep.equal(testData);
    });
    it('addSuite', async () => {
        expect(await testRailApi.addSuite(1)).to.deep.equal(testData);
    });
    it('updateSuite', async () => {
        expect(await testRailApi.updateSuite(1)).to.deep.equal(testData);
    });
    it('deleteSuite', async () => {
        expect(await testRailApi.deleteSuite(1)).to.equal(200);
    });
});
