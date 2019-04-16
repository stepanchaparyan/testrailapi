import { expect } from 'chai';
import nock from 'nock';
import TestRailAPI from '../index';

let testRailApi;
const uri = '//index.php?/api/v2/';

let usersData = [
	{
		id: 1,
		name: 'Diego Maradona',
		email: 'diego@gmail.com',
		is_active: true
	}
];

describe('Get nock data - users', () => {
	testRailApi = new TestRailAPI('stepan', 'username', 'password');

    nock('https://stepan.testrail.io')
    .get(uri + 'get_users/')
    .reply(200, usersData);

	it('getUsers', async () => {
		expect(await testRailApi.getUsers()).to.deep.equal(usersData);
	});
});
