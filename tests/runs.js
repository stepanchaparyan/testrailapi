import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';
import runExample from './examples/runExample';

let testRailApi;
const uri = '//index.php?/api/v2/';

let runData = runExample;
describe('Get nock data - runs', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .post(uri + 'add_run/1')
    .reply(200, runData);

    nock('https://stepan.testrail.io')
    .post(uri + 'add_run/1')
    .reply(200, runData);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_cases/1/&suite_id=1&type_id=3')
    .reply(200, [ 1,2,3 ]);

    it('addRun', async () => {
        expect(await testRailApi.addRun(1)).to.be.an('number');
    });
    it('addRunWithType', async () => {
        expect(await testRailApi.addRunWithType(1,3)).to.be.an('number');
    });
});
