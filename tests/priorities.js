import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';

let testRailApi;
const uri = '//index.php?/api/v2/';

let testData = [
	{ 'id': 1, 'name': 'Priorities - 1' },
	{ 'id': 2, 'name': 'Priorities - 2' }
];
describe('Get nock data - priorities', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .get(uri + 'get_priorities/')
    .reply(200, testData);

    it('getPriorities', async () => {
        expect(await testRailApi.getPriorities()).to.deep.equal(testData);
    });

});
