import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';

let testRailApi;
const uri = '//index.php?/api/v2/';

let testData = [
	{ 'id': 1, 'name': 'Chrome' },
	{ 'id': 2, 'name': 'Firefox' }
];
describe('Get nock data - configs', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .get(uri + 'get_configs/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'add_config/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'add_config_group/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'update_config/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'update_config_group/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'delete_config/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'delete_config_group/1')
    .reply(200, testData);
    
    it('getConfigs', async () => {
        expect(await testRailApi.getConfigs(1)).to.deep.equal(testData);
    });
    it('addConfig', async () => {
        expect(await testRailApi.addConfig(1)).to.deep.equal(testData);
    });
    it('addConfigGroup', async () => {
        expect(await testRailApi.addConfigGroup(1)).to.deep.equal(testData);
    });
    it('updateConfig', async () => {
        expect(await testRailApi.updateConfig(1)).to.deep.equal(testData);
    });
    it('updateConfigGroup', async () => {
        expect(await testRailApi.updateConfigGroup(1)).to.deep.equal(testData);
    });
    it('deleteConfig', async () => {
        expect(await testRailApi.deleteConfig(1)).to.equal(200);
    });
    it('deleteConfigGroup', async () => {
        expect(await testRailApi.deleteConfigGroup(1)).to.equal(200);
    });
});
