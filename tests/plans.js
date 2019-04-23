import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';

let testRailApi;
const uri = '//index.php?/api/v2/';

let testData = [
	{ 'id': 1, 'name': 'System test 1' },
	{ 'id': 2, 'name': 'System test 1' }
];
describe('Get nock data - plans', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .get(uri + 'get_plan/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_plans/1')
    .reply(200, [ {id:1, title: 'Run1'} ]);

    nock('https://stepan.testrail.io')
    .post(uri + 'add_plan/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'add_plan_entry/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'update_plan/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'close_plan/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'delete_plan/1')
    .reply(200, testData);

	it('getPlan', async () => {
        expect(await testRailApi.getPlan(1)).to.deep.equal(testData);
    });
    it('getPlans', async () => {
        expect(await testRailApi.getPlans(1)).to.be.an('array');
    });
    it('addPlan', async () => {
        expect(await testRailApi.addPlan(1)).to.deep.equal(testData);
    });
    it('addPlanEntry', async () => {
        expect(await testRailApi.addPlanEntry(1)).to.deep.equal(testData);
    });
    it('updatePlan', async () => {
        expect(await testRailApi.updatePlan(1)).to.deep.equal(testData);
    });
    it('closePlan', async () => {
        expect(await testRailApi.closePlan(1)).to.deep.equal(testData);
    });
    it('deletePlan', async () => {
        expect(await testRailApi.deletePlan(1)).to.equal(200);
    });
});
