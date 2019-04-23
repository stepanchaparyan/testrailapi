import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';

let testRailApi;
const uri = '//index.php?/api/v2/';

let testData = [
	{ 'id': 1, 'name': 'Project 1' },
	{ 'id': 2, 'name': 'Project 2' }
];
describe('Get nock data - projects', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .get(uri + 'get_project/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_projects&is_completed=1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'add_project/')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'update_project/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'delete_project/1')
    .reply(200, testData);
    
    it('getProject', async () => {
        expect(await testRailApi.getProject(1)).to.deep.equal(testData);
    });
    it('getProjects', async () => {
        expect(await testRailApi.getProjects(1)).to.deep.equal(testData);
    });
    it('addProject', async () => {
        expect(await testRailApi.addProject()).to.deep.equal(testData);
    });
    it('updateProject', async () => {
        expect(await testRailApi.updateProject(1)).to.deep.equal(testData);
    });
    it('deleteProject', async () => {
        expect(await testRailApi.deleteProject(1)).to.equal(200);
    });
});
