import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';

let testRailApi;
const uri = '//index.php?/api/v2/';

let runData = { id: 1, 'name': 'Run 1' };

describe('Get nock data - runs', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .post(uri + 'add_run/1')
    .reply(200, runData);

    nock('https://stepan.testrail.io')
    .post(uri + 'add_run/1')
    .reply(200, runData);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_cases/1&suite_id=1&type_id=3')
    .reply(200, [ 1,2,3 ]);

     nock('https://stepan.testrail.io')
    .post(uri + 'update_run/1')
    .reply(200, runData);

    nock('https://stepan.testrail.io')
    .post(uri + 'close_run/1')
    .reply(200, runData);

    nock('https://stepan.testrail.io')
    .post(uri + 'delete_run/1')
    .reply(200, runData);

    it('addRun', async () => {
        expect(await testRailApi.addRun(1)).to.deep.equal(runData);
    });
    it('addRunWithType', async () => {
        expect(await testRailApi.addRunWithType(1,3)).to.be.an('number');
    });
    it('updateRun', async () => {
        expect(await testRailApi.updateRun(1)).to.deep.equal(runData);
    });
    it('closeRun', async () => {
        expect(await testRailApi.closeRun(1)).to.deep.equal(runData);
    });
    it('deleteRun', async () => {
        expect(await testRailApi.deleteRun(1)).to.equal(200);
    });
});
