import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';

let testRailApi;
const uri = '//index.php?/api/v2/';

let testData = { 'id': 1, 'name': 'Section 1' };

describe('Get nock data - sections', function () {
    testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .get(uri + 'get_section/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_sections/1/&suite_id=1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'add_section/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'update_section/1')
    .reply(200, testData);

    nock('https://stepan.testrail.io')
    .post(uri + 'delete_section/1')
    .reply(200, testData);
    
    it('getSection', async () => {
        expect(await testRailApi.getSection(1)).to.deep.equal(testData);
    });
    it('getSections', async () => {
        expect(await testRailApi.getSections(1)).to.deep.equal(testData);
    });
    it('addSections', async () => {
        expect(await testRailApi.addSection(1)).to.deep.equal(testData);
    });
    it('updateSection', async () => {
        expect(await testRailApi.updateSection(1)).to.deep.equal(testData);
    });
    it('deleteSection', async () => {
        expect(await testRailApi.deleteSection(1)).to.equal(200);
    });
});
