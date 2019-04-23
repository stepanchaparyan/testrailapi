import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';

let testRailApi;
const uri = '//index.php?/api/v2/';

let testData = [
	{ 'id': 1, 'name': 'Release 1.5' },
	{ 'id': 2, 'name': 'Release 1.6' }
];
describe('Get nock data - milestones', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .get(uri + 'get_milestone/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_milestones/1')
    .reply(200, [ {id:1, title: 'Test1'} ]);

    nock('https://stepan.testrail.io')
    .post(uri + 'add_milestone/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'update_milestone/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'delete_milestone/1')
    .reply(200, testData);

	it('getMilestone', async () => {
        expect(await testRailApi.getMilestone(1)).to.deep.equal(testData);
    });
    it('getMilestones', async () => {
        expect(await testRailApi.getMilestones(1)).to.be.an('array');
    });
    it('addMilestone', async () => {
        expect(await testRailApi.addMilestone(1)).to.deep.equal(testData);
    });
    it('updateMilestone', async () => {
        expect(await testRailApi.updateMilestone(1)).to.deep.equal(testData);
    });
    it('deleteMilestone', async () => {
        expect(await testRailApi.deleteMilestone(1)).to.equal(200);
    });

});
