const fetch = require('node-fetch');
const base64 = require('base-64');
const jsonpath = require('jsonpath');
const path = require('path');

module.exports = class TestRailAPIs {
	constructor (host, username, password) {	
	this.host = `https://${host}.testrail.io//index.php?/api/v2/`;
		this.headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: 'Basic ' + base64.encode(username + ':' + password)
		};
	}

	async myFetch (url, options, message = '') {
		let data = await fetch(url, options);
		await this.handleErrors(data, message);
		let main = await data.json();
		return main;
	}

	handleErrors (response, message) {
		if (!response.ok) {
			if (response.statusText === 'Not Found') {
				throw Error('Provided host name is wrong');
			} else if (response.statusText === 'Unauthorized') {
				throw Error('Provided login or password is wrong');
			} else if (response.statusText === 'Bad Request') {
				throw Error(message);
			} else {
				throw Error(response.statusText);
			}
		} else {
			return response;
		}
	}

	// Returns an existing test case
	async getCase (caseId) {
		const method = 'get_case/';
		const pathname = path.join(`${method}`, `${caseId}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided case id is not valid');
		return await data;
	}

	// Returns a list of test cases for a project
	async getAllCases (projectId) {
		const method = 'get_cases/';
		const pathname = path.join(`${method}`, `${projectId}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided projectId is not valid');
		return await data;
	}

	// Returns a list of test cases IDs for a project and case type
	async getCasesIDsByType (projectId, typeId) {
		const method = 'get_cases/';
		const suiteId = '&suite_id=1&type_id=';
		const pathname = path.join(`${method}`, `${projectId}`, `${suiteId}`);
		const url = this.host + pathname + typeId;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided project ID or type ID is not valid');
		const IDs = jsonpath.query(data, '$..id');
		return await IDs;
	}

	// Return all tests for a test run
	async getTests (runId) {
		const method = 'get_tests/';
		const pathname = path.join(`${method}`, `${runId}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided run number is not valid');
		return await data;
	}

	// Returns a list of test results for a test run (except untested tests)
	async getResultsForRun (runId) {
		const method = 'get_results_for_run/';
		const pathname = path.join(`${method}`, `${runId}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided run ID is not valid');
		return await data;
	}

	//Returns a status of case
	async getResultForCase (runId, caseId) {
		const method = 'get_results_for_case/';
		const pathname = path.join(`${method}`, `${runId}/`, `${caseId}`);
		const url = this.host + pathname;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options, 'Provided run ID or case ID is not valid');
		if (data.length === 0) {
			return undefined;
		} else {
			return await data[0].status_id;
		}
	}

	// Returns run name with time
	async getRunName () {
		const date = new Date();
		let month, day, minute;
		const getDay = date.getDate();
		getDay < 10 ? (day = `0${getDay}`) : (day = getDay);
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		month = months[new Date().getMonth()];
		
		const year = date.getFullYear();
		const hour = date.getHours();
		let getMinute = date.getMinutes();
		getMinute < 10 ? (minute = `0${getMinute}`) : (minute = getMinute);
		const fullTime = month + ' ' + day + ' ' + year + ', ' + hour + ':' + minute;
		const runName = `Automated test run - ${fullTime}`;
		return await runName;
	}

	// Creates a new test run and returns run ID
	async addRun (projectId, suiteId = 1) {
		const method = 'add_run/';
		const pathname = path.join(`${method}`, `${projectId}`);
		const url = this.host + pathname;
		const body = {
			name: await this.getRunName(),
			suite_id: suiteId,
			include_all: true
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided project ID is not valid');
		return await data.id;
	}

	// Creates a new test run for specific case type and returns run ID
	async addRunWithType (project_id, type_id, suite_id = 1) {
		const method = 'add_run/';
		const pathname = path.join(`${method}`, `${project_id}`);
		const url = this.host + pathname;
		const body = {
			name: await this.getRunName(),
			suite_id: suite_id,
			include_all: false,
			case_ids: await this.getCasesIDsByType(project_id, type_id)
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided project ID or type ID is not valid');
		return await data.id;
	}

	// Adds a new test result or comment for a test
	async addResult (testId, statusId, comment = '') {
		const method = 'add_result/';
		const pathname = path.join(`${method}`, `${testId}`);
		const url = this.host + pathname;
		const body = {
			status_id: statusId,
			comment: comment
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided test ID or status Id is not valid');
		return await data;
	}

	// Adds a new test result or comment for a case
	async addResultForCase (runId, caseId, status_id, comment = '') {
		const method = 'add_result_for_case/';
		const pathname = path.join(`${method}`, `${runId}/`, `${caseId}`);
		const url = this.host + pathname;
		const body = {
			status_id: status_id,
			comment: comment
		};
		const options = {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify(body)
		};

		const data = await this.myFetch(url, options, 'Provided run ID, case ID or status ID is not valid');
		return await data;
	}

	// Returns a list of users
	async getUsers () {
		const method = 'get_users/';
		const url = this.host + method;
		const options = {
			method: 'GET',
			headers: this.headers
		};

		const data = await this.myFetch(url, options);
		return await data;
	}
};
