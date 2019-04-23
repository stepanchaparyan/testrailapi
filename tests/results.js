import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';

let testRailApi;
const uri = '//index.php?/api/v2/';
let testData = [
	{ 'id': 1, 'status_id': 1 },
	{ 'id': 2, 'status_id': 2 }
];

describe('Get nock data - results', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');
    
    nock('https://stepan.testrail.io')
    .get(uri + 'get_results/1')
    .reply(200, [ ] );

    nock('https://stepan.testrail.io')
    .get(uri + 'get_results_for_run/1')
    .reply(200, [ ] );

    nock('https://stepan.testrail.io')
    .get(uri + 'get_results_for_run/0')
    .reply(200, { } );

    nock('https://stepan.testrail.io')
    .get(uri + 'get_results_for_case/1/2')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_results_for_case/1/20')
    .reply(200, [ ] );

    nock('https://stepan.testrail.io')
    .post(uri + 'add_result/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'add_result_for_case/1/2')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_result_fields/')
    .reply(200, testData);

    it('getResults', async () => {
        expect(await testRailApi.getResults(1)).to.be.an('array');
    });
	it('getResultsForRun', async () => {
        expect(await testRailApi.getResultsForRun(1)).to.be.an('array');
    });
	it('getResultsForRun', async () => {
        expect(await testRailApi.getResultsForRun(0)).to.be.an('object');
    });
	it('getResultForCase', async () => {
        expect(await testRailApi.getResultForCase(1,2)).to.be.an('number');
    });
    it('getResultForCase', async () => {
        expect(await testRailApi.getResultForCase(1,20)).to.be.an('undefined');
    });
	it('addResult', async () => {
        expect(await testRailApi.addResult(1,1)).to.be.an('array');
    });
	it('addResultForCase', async () => {
        expect(await testRailApi.addResultForCase(1,2)).to.be.an('array');
    });
    it('getResultFields', async () => {
        expect(await testRailApi.getResultFields()).to.be.an('array');
    });
});
