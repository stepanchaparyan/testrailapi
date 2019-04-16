import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';
//import testRailCreds from '../testRailSettings';
import caseExample from './examples/caseExamples';

let testRailApi;
const uri = '//index.php?/api/v2/';

let testData = caseExample;
describe('Get nock data - cases', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .get(uri + 'get_case/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_cases/1')
    .reply(200, [ {id:1, title: 'Test1'} ]);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_cases/1/&suite_id=1&type_id=3')
    .reply(200, [ 1,2,3 ]);

    //testRailApi = new TestRailAPI(testRailCreds.host,testRailCreds.username, testRailCreds.password);

	it('getCase', async () => {
        expect(await testRailApi.getCase(1)).to.deep.equal(testData);
    });
    it('getCases', async () => {
        expect(await testRailApi.getAllCases(1)).to.be.an('array');
    });
    it('getCasesIDsByType', async () => {
        expect(await testRailApi.getCasesIDsByType(1,3)).to.be.an('array');
    });
});
