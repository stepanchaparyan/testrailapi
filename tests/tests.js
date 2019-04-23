import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';

let testRailApi;
const uri = '//index.php?/api/v2/';

let testData = [
    { id: 12, test_id: 3 }
];

describe('Get nock data - tests', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .get(uri + 'get_test/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_tests/1&status_id=1')
    .reply(200, testData);

    it('getTest', async () => {
        expect(await testRailApi.getTest(1)).to.deep.equal(testData);
    });
	it('getTests', async () => {
        expect(await testRailApi.getTests(1,1)).to.deep.equal(testData);
    });
});
