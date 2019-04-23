import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';

let testRailApi;
const uri = '//index.php?/api/v2/';

let testData = [
	{ 'id': 1, 'name': 'Test Case' }
];
describe('Get nock data - templates', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .get(uri + 'get_templates/1')
    .reply(200, testData);

    it('getTemplates', async () => {
        expect(await testRailApi.getTemplates(1)).to.deep.equal(testData);
    });

});
