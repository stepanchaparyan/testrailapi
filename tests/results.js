import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';
import testExample from './examples/testExample';

let testRailApi;
const uri = '//index.php?/api/v2/';
let testData = testExample;

describe('Get nock data - results', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .get(uri + 'get_results_for_run/1')
    .reply(200, [ ] );

    nock('https://stepan.testrail.io')
    .get(uri + 'get_results_for_case/1/2')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'add_result/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'add_result_for_case/1/2')
    .reply(200, testData);


	it('getResultsForRun', async () => {
        expect(await testRailApi.getResultsForRun(1)).to.be.an('array');
    });
	it('getResultForCase', async () => {
        expect(await testRailApi.getResultForCase(1,2)).to.be.an('number');
    });
	it('addResult', async () => {
        expect(await testRailApi.addResult(1,1)).to.be.an('array');
    });
	it('addResultForCase', async () => {
        expect(await testRailApi.addResultForCase(1,2)).to.be.an('array');
    });
});
