import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';

let testRailApi;
const uri = '//index.php?/api/v2/';

let testData = [
    { 'id': 1, 'name': 'Passed' }
];

describe('Get nock data - statuses', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .get(uri + 'get_statuses/')
    .reply(200, testData);

    it('getStatuses', async () => {
        expect(await testRailApi.getStatuses()).to.deep.equal(testData);
    });
});
