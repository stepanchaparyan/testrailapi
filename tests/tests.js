import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';
import testExample from './examples/testExample';

let testRailApi;
const uri = '//index.php?/api/v2/';

let testData = testExample;
describe('Get nock data - tests', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .get(uri + 'get_tests/1')
    .reply(200, testData);

	it('getTests', async () => {
        expect(await testRailApi.getTests(1)).to.deep.equal(testData);
    });
});
