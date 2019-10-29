import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';

let testRailApi;
const uri = '//index.php?/api/v2/';

const testData = [
    {
        "id": 444,
        "name": "What-Testers-Should-Be-Automating.jpg",
        "filename": "444.what_testers_should_be_automating.jpg",
        "size": 166994,
        "created_on": 1554737184,
        "project_id": 14,
        "case_id": 3414,
        "test_change_id": 17899,
        "user_id": 10
    }
];

describe('Get nock data - attachments', () => {
	testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .post(uri + 'add_attachment_to_result/1')
	.reply(200);

	nock('https://stepan.testrail.io')
	.get(uri + 'get_attachments_for_case/1')
	.reply(200, testData);

	nock('https://stepan.testrail.io')
	.get(uri + 'get_attachments_for_test/1')
	.reply(200, testData);

	nock('https://stepan.testrail.io')
	.get(uri + 'get_attachment/1')
	.reply(200);

	nock('https://stepan.testrail.io')
	.post(uri + 'delete_attachment/1')
	.reply(200);

	it('addAttachmentToResult', async () => {
		const res = await testRailApi.addAttachmentToResult(1, 'tests/fixtures/airplane.png');
		expect(res.status).to.equal(200);
	});

	it('getAttachmentsForCase', async () => {
		const res = await testRailApi.getAttachmentsForCase(1);
		expect(res).to.deep.equal(testData);
	});

	it('getAttachmentsForTest', async () => {
		const res = await testRailApi.getAttachmentsForTest(1);
		expect(res).to.deep.equal(testData);
	});

	it('getAttachment', async () => {
		const res = await testRailApi.getAttachment(1);
		expect(res).to.not.equal(undefined);
	});

	it('deleteAttachment', async () => {
		const res = await testRailApi.deleteAttachment(1);
		expect(res).to.equal(200);
	});
});
