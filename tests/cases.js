import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';

let testRailApi;
const uri = '//index.php?/api/v2/';

let testData = [
	{ 'id': 1, 'name': 'Test 1' },
	{ 'id': 2, 'name': 'Test 2' }
];

describe('Get nock data - cases', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .get(uri + 'get_case/1')
    .reply(200, testData);

    nock('https://stepanerror.testrail.io')
    .get(uri + 'get_case/2')
    .replyWithError();

    nock('https://stepan.testrail.io')
    .get(uri + 'get_case/9999')
    .reply(400);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_cases/1')
    .reply(200, [ {id:1, title: 'Test1'} ]);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_cases/1/&suite_id=1&type_id=3')
    .reply(200, [ 1,2,3 ]);

    nock('https://stepan.testrail.io')
    .post(uri + 'add_case/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'update_case/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'delete_case/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_case_fields/')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_case_types/')
    .reply(200, testData);

	it('getCase', async () => {
        expect(await testRailApi.getCase(1)).to.deep.equal(testData);
    });
    it('getCaseWithError', async () => {
        expect(await testRailApi.getCaseWithError(2)).to.equal(undefined);
    });
    it('getCaseWithBadRequest', async () => {
        expect(await testRailApi.getCaseWithBadRequest(9999)).to.equal(400);
    });
    it('getCases', async () => {
        expect(await testRailApi.getAllCases(1)).to.be.an('array');
    });
    it('getCasesIDsByType', async () => {
        expect(await testRailApi.getCasesIDsByType(1,3)).to.be.an('array');
    });
    it('addCase', async () => {
        expect(await testRailApi.addCase(1)).to.deep.equal(testData);
    });
    it('updateCase', async () => {
        expect(await testRailApi.updateCase(1)).to.deep.equal(testData);
    });
    it('deleteCase', async () => {
        expect(await testRailApi.deleteCase(1)).to.equal(200);
    });

    it('getCaseFields', async () => {
        expect(await testRailApi.getCaseFields()).to.be.an('array');
    });
    it('getCaseTypes', async () => {
        expect(await testRailApi.getCaseTypes()).to.be.an('array');
    });
});
