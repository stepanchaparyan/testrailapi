import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';

let testRailApi;
const uri = '//index.php?/api/v2/';

let usersData = [
	{ id: 1, name: 'Diego Maradona' }
];

describe('Get nock data - users', () => {
	testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .get(uri + 'get_user/1')
	.reply(200, usersData);

    nock('https://stepan.testrail.io')
    .get(uri + 'get_users/')
	.reply(200, usersData);

	nock('https://stepan.testrail.io')
    .get(uri + 'get_user_by_email&email=test@gmail.com')
    .reply(200, usersData);

	it('getUser', async () => {
		expect(await testRailApi.getUser(1)).to.deep.equal(usersData);
	});
	it('getUsers', async () => {
		expect(await testRailApi.getUsers()).to.deep.equal(usersData);
	});
	it('getUserByEmail', async () => {
		expect(await testRailApi.getUserByEmail('test@gmail.com')).to.deep.equal(usersData);
	});
});
